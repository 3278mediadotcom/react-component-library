import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders a switch with role="switch"', () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('is off by default', () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('is on when defaultChecked is true', () => {
    render(<Switch label="Dark mode" defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('supports controlled usage', () => {
    render(<Switch label="Dark mode" checked={true} onCheckedChange={() => undefined} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles when clicked', async () => {
    const user = userEvent.setup();
    render(<Switch label="Dark mode" />);
    const toggle = screen.getByRole('switch');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles with the Enter key', async () => {
    const user = userEvent.setup();
    render(<Switch label="Dark mode" />);
    const toggle = screen.getByRole('switch');
    await user.tab();
    await user.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles with the Space key', async () => {
    const user = userEvent.setup();
    render(<Switch label="Dark mode" />);
    const toggle = screen.getByRole('switch');
    await user.tab();
    await user.keyboard(' ');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Dark mode" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled is true', () => {
    render(<Switch label="Dark mode" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Switch label="Dark mode" defaultChecked={false} disabled />);
    const toggle = screen.getByRole('switch');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('does not toggle when loading', async () => {
    const user = userEvent.setup();
    render(<Switch label="Dark mode" loading />);
    const toggle = screen.getByRole('switch');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('shows a spinner when loading', () => {
    const { container } = render(<Switch label="Dark mode" loading />);
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('links the visible label via aria-labelledby', () => {
    render(<Switch label="Dark mode" />);
    const toggle = screen.getByRole('switch');
    const labelledBy = toggle.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy as string)).toHaveTextContent('Dark mode');
  });

  it('renders the checked icon when on', () => {
    render(
      <Switch
        label="Dark mode"
        defaultChecked
        checkedIcon={<svg data-testid="sun" viewBox="0 0 24 24" />}
      />,
    );
    expect(screen.getByTestId('sun')).toBeInTheDocument();
  });

  it('renders the unchecked icon when off', () => {
    render(
      <Switch label="Dark mode" uncheckedIcon={<svg data-testid="moon" viewBox="0 0 24 24" />} />,
    );
    expect(screen.getByTestId('moon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Switch label="Dark mode" className="my-switch" />);
    expect(container.querySelector('div')).toHaveClass('my-switch');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Switch label="Dark mode" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
