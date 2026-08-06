import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox with a label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders checked when checked is true', () => {
    render(<Checkbox label="Accept terms" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders a controlled checkbox', () => {
    render(<Checkbox label="Accept terms" checked={true} onChange={() => undefined} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('sets indeterminate state', () => {
    const { container } = render(<Checkbox label="Select all" indeterminate />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it('clears indeterminate state', () => {
    const { container } = render(<Checkbox label="Select all" indeterminate={false} />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.indeterminate).toBe(false);
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" defaultChecked={false} />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('toggles with the Space key', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" defaultChecked={false} />);
    const checkbox = screen.getByRole('checkbox');
    await user.tab();
    await user.keyboard(' ');
    expect(checkbox).toBeChecked();
  });

  it('is disabled when disabled is true', () => {
    render(<Checkbox label="Accept terms" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" defaultChecked={false} disabled />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('renders helper text', () => {
    render(<Checkbox label="Notifications" helperText="We send a weekly digest." />);
    expect(screen.getByText('We send a weekly digest.')).toBeInTheDocument();
  });

  it('wires helper text via aria-describedby', () => {
    render(<Checkbox label="Notifications" helperText="We send a weekly digest." />);
    const checkbox = screen.getByRole('checkbox');
    const describedBy = checkbox.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent(
      'We send a weekly digest.',
    );
  });

  it('renders an error message', () => {
    render(<Checkbox label="Accept terms" error="This is required." />);
    expect(screen.getByRole('alert')).toHaveTextContent('This is required.');
  });

  it('sets aria-invalid when an error is present', () => {
    render(<Checkbox label="Accept terms" error="This is required." />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('fires onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<Checkbox label="Accept terms" className="my-checkbox" />);
    expect(container.querySelector('div')).toHaveClass('my-checkbox');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Checkbox label="Accept terms" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
