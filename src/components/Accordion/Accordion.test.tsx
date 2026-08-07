import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './Accordion';

const ITEMS = [
  { value: 'one', header: 'Item One', content: <p>First panel</p> },
  { value: 'two', header: 'Item Two', content: <p>Second panel</p> },
  { value: 'three', header: 'Item Three', content: <p>Third panel</p> },
];

describe('Accordion', () => {
  it('renders a trigger per item', () => {
    render(<Accordion items={ITEMS} />);
    expect(screen.getByRole('button', { name: 'Item One' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Item Two' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Item Three' })).toBeInTheDocument();
  });

  it('opens the first item by default in single mode', () => {
    render(<Accordion items={ITEMS} />);
    expect(screen.getByRole('button', { name: 'Item One' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Item Two' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('opens the defaultValue in single mode', () => {
    render(<Accordion items={ITEMS} defaultValue={['two']} />);
    expect(screen.getByRole('button', { name: 'Item Two' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('shows the open panel content and hides closed panels', () => {
    const { container } = render(<Accordion items={ITEMS} />);
    const panels = Array.from(container.querySelectorAll('[role="region"]'));
    expect(panels).toHaveLength(3);
    expect(panels[0]).toHaveTextContent('First panel');
    expect(panels[0]).not.toHaveAttribute('aria-hidden');
    expect(panels[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('wires the trigger to its region via aria-controls/aria-labelledby', () => {
    render(<Accordion items={ITEMS} />);
    const trigger = screen.getByRole('button', { name: 'Item One' });
    const panelId = trigger.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = document.getElementById(panelId as string);
    expect(panel).toBeInTheDocument();
    expect(panel?.getAttribute('aria-labelledby')).toBe(trigger.id);
  });

  it('toggles an item on click', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    const trigger = screen.getByRole('button', { name: 'Item One' });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('fires onValueChange when an item opens', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Accordion items={ITEMS} onValueChange={onValueChange} />);
    await user.click(screen.getByRole('button', { name: 'Item Two' }));
    expect(onValueChange).toHaveBeenCalledWith(['two']);
  });

  it('supports controlled usage', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Accordion items={ITEMS} value={['one']} onValueChange={onValueChange} />);
    await user.click(screen.getByRole('button', { name: 'Item Two' }));
    // Controlled: the open set still reports 'one' until the owner re-renders.
    expect(onValueChange).toHaveBeenCalledWith(['two']);
    expect(screen.getByRole('button', { name: 'Item One' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('opens multiple items when type is multiple', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} type="multiple" />);
    await user.click(screen.getByRole('button', { name: 'Item One' }));
    await user.click(screen.getByRole('button', { name: 'Item Two' }));
    expect(screen.getByRole('button', { name: 'Item One' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Item Two' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('keeps only one item open in single mode', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    await user.click(screen.getByRole('button', { name: 'Item Two' }));
    expect(screen.getByRole('button', { name: 'Item Two' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Item One' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('cannot collapse the open item when collapsible is false', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} collapsible={false} />);
    const trigger = screen.getByRole('button', { name: 'Item One' });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('disables an item trigger', () => {
    const items = [
      { value: 'a', header: 'A', content: <p>A</p> },
      { value: 'b', header: 'B', disabled: true, content: <p>B</p> },
    ];
    render(<Accordion items={items} defaultValue={['a']} />);
    const disabledTrigger = screen.getByRole('button', { name: 'B' });
    expect(disabledTrigger).toBeDisabled();
    expect(disabledTrigger).toHaveAttribute('aria-disabled', 'true');
  });

  it('keeps only the open trigger in the tab order', () => {
    render(<Accordion items={ITEMS} />);
    const triggers = screen.getAllByRole('button');
    expect(triggers.filter((t) => t.tabIndex === 0)).toHaveLength(1);
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('moves focus with ArrowDown', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: 'Item Two' })).toHaveFocus();
  });

  it('moves focus with ArrowUp', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('button', { name: 'Item One' })).toHaveFocus();
  });

  it('moves focus to the last trigger with End', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    await user.tab();
    await user.keyboard('{End}');
    expect(screen.getByRole('button', { name: 'Item Three' })).toHaveFocus();
  });

  it('moves focus to the first trigger with Home', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    await user.tab();
    await user.keyboard('{End}');
    await user.keyboard('{Home}');
    expect(screen.getByRole('button', { name: 'Item One' })).toHaveFocus();
  });

  it('skips disabled items during keyboard navigation', async () => {
    const user = userEvent.setup();
    const items = [
      { value: 'a', header: 'A', content: <p>A</p> },
      { value: 'b', header: 'B', disabled: true, content: <p>B</p> },
      { value: 'c', header: 'C', content: <p>C</p> },
    ];
    render(<Accordion items={items} />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: 'C' })).toHaveFocus();
  });

  it('opens an item with Enter after keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'Item Two' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('opens an item with Space after keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    await user.keyboard(' ');
    expect(screen.getByRole('button', { name: 'Item Two' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('renders the disclosure chevron', () => {
    const { container } = render(<Accordion items={ITEMS} />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('▾');
  });

  it('applies custom className', () => {
    const { container } = render(<Accordion items={ITEMS} className="my-accordion" />);
    expect(container.firstChild).toHaveClass('my-accordion');
  });
});
