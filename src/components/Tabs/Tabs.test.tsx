import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from './Tabs';

const ITEMS = [
  { value: 'overview', label: 'Overview', content: <p>Overview content</p> },
  { value: 'activity', label: 'Activity', content: <p>Activity content</p> },
  { value: 'settings', label: 'Settings', content: <p>Settings content</p> },
];

describe('Tabs', () => {
  it('renders a tablist with tabs', () => {
    render(<Tabs items={ITEMS} label="Account" />);
    expect(screen.getByRole('tablist', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('activates the first tab by default', () => {
    render(<Tabs items={ITEMS} label="Account" />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });

  it('activates the defaultValue tab', () => {
    render(<Tabs items={ITEMS} label="Account" defaultValue="settings" />);
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-selected', 'true');
  });

  it('supports controlled usage', () => {
    render(<Tabs items={ITEMS} label="Account" value="activity" onValueChange={() => undefined} />);
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true');
  });

  it('shows the active tabpanel', () => {
    render(<Tabs items={ITEMS} label="Account" />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content');
  });

  it('hides inactive panels', () => {
    render(<Tabs items={ITEMS} label="Account" />);
    const panels = screen.getAllByRole('tabpanel');
    panels.forEach((panel) => {
      if (within(panel).queryByText('Overview content')) {
        expect(panel).not.toHaveAttribute('hidden');
      } else {
        expect(panel).toHaveAttribute('hidden');
      }
    });
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} label="Account" />);
    await user.click(screen.getByRole('tab', { name: 'Settings' }));
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Settings content');
  });

  it('fires onValueChange on tab selection', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Tabs items={ITEMS} label="Account" onValueChange={onValueChange} />);
    await user.click(screen.getByRole('tab', { name: 'Activity' }));
    expect(onValueChange).toHaveBeenCalledWith('activity');
  });

  it('wires tab to panel via aria-controls and aria-labelledby', () => {
    render(<Tabs items={ITEMS} label="Account" />);
    const tab = screen.getByRole('tab', { name: 'Overview' });
    const panelId = tab.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = document.getElementById(panelId as string);
    expect(panel).toBeInTheDocument();
    expect(panel?.getAttribute('aria-labelledby')).toBe(tab.id);
  });

  it('keeps only the active tab in the tab order', () => {
    render(<Tabs items={ITEMS} label="Account" defaultValue="activity" />);
    const tabbed = screen.getAllByRole('tab').filter((t) => t.getAttribute('tabindex') === '0');
    expect(tabbed).toHaveLength(1);
    expect(tabbed[0]).toHaveTextContent('Activity');
  });

  it('moves focus and activates with ArrowRight (automatic activation)', async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} label="Account" />);
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true');
  });

  it('moves focus only with Home without activating', async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} label="Account" defaultValue="settings" />);
    await user.tab();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-selected', 'true');
  });

  it('selects a focused tab with Enter after Home/End navigation', async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} label="Account" defaultValue="settings" />);
    await user.tab();
    await user.keyboard('{Home}');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });

  it('selects a focused tab with Space after Home/End navigation', async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} label="Account" defaultValue="settings" />);
    await user.tab();
    await user.keyboard('{Home}');
    await user.keyboard(' ');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });

  it('moves focus to the last tab with End without activating', async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} label="Account" defaultValue="overview" />);
    await user.tab();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
  });

  it('uses vertical orientation with ArrowDown', async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} label="Account" orientation="vertical" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveFocus();
  });

  it('disables a tab and skips it in navigation', async () => {
    const user = userEvent.setup();
    const disabledItems = [
      { value: 'a', label: 'Tab A', content: <p>A</p> },
      { value: 'b', label: 'Tab B', disabled: true, content: <p>B</p> },
      { value: 'c', label: 'Tab C', content: <p>C</p> },
    ];
    render(<Tabs items={disabledItems} label="Account" />);
    const tabB = screen.getByRole('tab', { name: 'Tab B' });
    expect(tabB).toBeDisabled();

    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab C' })).toHaveFocus();
  });

  it('renders icons', () => {
    render(
      <Tabs
        items={[
          { value: 'a', label: 'Home', icon: <svg data-testid="home-icon" viewBox="0 0 24 24" /> },
        ]}
        label="Account"
      />,
    );
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Tabs items={ITEMS} label="Account" className="my-tabs" />);
    expect(container.querySelector('div')).toHaveClass('my-tabs');
  });
});
