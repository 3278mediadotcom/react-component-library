import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders an input with type text by default', () => {
    render(<Input aria-label="Name" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it.each(['email', 'password', 'number', 'search', 'url'] as const)(
    'supports the %s type',
    (type) => {
      render(<Input type={type} aria-label="Field" />);
      expect(screen.getByLabelText('Field')).toHaveAttribute('type', type);
    },
  );

  it('associates the label with the input via htmlFor/id', () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
  });

  it('uses the provided id over the generated one', () => {
    render(<Input label="Name" id="custom-id" />);
    expect(screen.getByLabelText('Name')).toHaveAttribute('id', 'custom-id');
  });

  it('renders a placeholder', () => {
    render(<Input placeholder="Enter name" aria-label="Name" />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<Input label="Password" helperText="8+ characters" />);
    expect(screen.getByText('8+ characters')).toBeInTheDocument();
  });

  it('wires helper text via aria-describedby', () => {
    render(<Input label="Password" helperText="8+ characters" />);
    const input = screen.getByLabelText('Password');
    const helperId = input.getAttribute('aria-describedby');
    expect(helperId).toBeTruthy();
    expect(document.getElementById(helperId as string)).toHaveTextContent('8+ characters');
  });

  it('renders an error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('sets aria-invalid when an error is present', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid without an error', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-invalid');
  });

  it('wires the error via aria-describedby', () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText('Email');
    const errorId = input.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId as string)).toHaveTextContent('Invalid email');
  });

  it('announces the error with role=alert', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('prefers the error over helper text', () => {
    render(<Input label="Email" helperText="We won't share this" error="Invalid email" />);
    expect(screen.queryByText("We won't share this")).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('disables the input', () => {
    render(<Input label="Name" disabled />);
    expect(screen.getByLabelText('Name')).toBeDisabled();
  });

  it('marks the input as required', () => {
    render(<Input label="Name" required />);
    // The label renders "Name*"; match the prefix with a regex.
    // Native required is used: screen readers announce it without aria-required.
    expect(screen.getByLabelText(/^Name/)).toHaveAttribute('required');
  });

  it('renders a prefix', () => {
    render(<Input label="Price" prefix="$" />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('renders a suffix', () => {
    render(<Input label="Domain" suffix=".com" />);
    expect(screen.getByText('.com')).toBeInTheDocument();
  });

  it('renders a left icon', () => {
    render(
      <Input label="Search" leftIcon={<svg data-testid="search-icon" viewBox="0 0 24 24" />} />,
    );
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('renders a right icon', () => {
    render(
      <Input label="Password" rightIcon={<svg data-testid="eye-icon" viewBox="0 0 24 24" />} />,
    );
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
  });

  it('calls onChange on user input', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);
    await user.type(screen.getByLabelText('Name'), 'abc');
    expect(onChange).toHaveBeenCalled();
  });

  it('is focusable via keyboard', async () => {
    const user = userEvent.setup();
    render(<Input label="Name" />);
    await user.tab();
    expect(screen.getByLabelText('Name')).toHaveFocus();
  });

  it('applies custom className', () => {
    const { container } = render(<Input label="Name" className="my-input" />);
    expect(container.querySelector('div')).toHaveClass('my-input');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Input label="Name" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
