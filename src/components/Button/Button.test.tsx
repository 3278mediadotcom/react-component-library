import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it.each([
    ['primary', 'bg-blue-600'],
    ['secondary', 'bg-slate-200'],
    ['outline', 'border-slate-300'],
    ['ghost', 'bg-transparent'],
    ['danger', 'bg-red-600'],
    ['success', 'bg-green-600'],
  ] as const)('renders the %s variant', (variant, expectedClass) => {
    render(<Button variant={variant}>Button</Button>);
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  it.each([
    ['xs', 'h-7'],
    ['sm', 'h-8'],
    ['md', 'h-10'],
    ['lg', 'h-11'],
    ['xl', 'h-12'],
  ] as const)('renders the %s size', (size, expectedClass) => {
    render(<Button size={size}>Button</Button>);
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  it('is disabled when disabled is true', () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-disabled on a disabled button', () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disables the button while loading', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('announces the loading state via aria-busy', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('keeps label text visible while loading', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders a decorative spinner while loading', () => {
    const { container } = render(<Button loading>Save</Button>);
    const spinner = container.querySelector('svg[aria-hidden="true"]');
    expect(spinner).toBeInTheDocument();
  });

  it('does not fire onClick while loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires onClick on Enter key', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires onClick on Space key', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await user.tab();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a left icon', () => {
    render(<Button leftIcon={<svg data-testid="left-icon" viewBox="0 0 24 24" />}>Save</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders a right icon', () => {
    render(<Button rightIcon={<svg data-testid="right-icon" viewBox="0 0 24 24" />}>Save</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('marks icon containers as decorative', () => {
    const { container } = render(<Button leftIcon={<svg viewBox="0 0 24 24" />}>Save</Button>);
    expect(container.querySelector('span[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('applies fullWidth class', () => {
    render(<Button fullWidth>Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('defaults type to button', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects an explicit type', () => {
    render(<Button type="submit">Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies custom className', () => {
    render(<Button className="my-button">Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('my-button');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Save</Button>);
    expect(ref).toHaveBeenCalled();
  });
});
