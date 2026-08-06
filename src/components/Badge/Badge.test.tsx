import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it.each([
    ['primary', 'bg-blue-50'],
    ['secondary', 'bg-slate-100'],
    ['success', 'bg-green-50'],
    ['warning', 'bg-amber-50'],
    ['danger', 'bg-red-50'],
    ['info', 'bg-sky-50'],
  ] as const)('applies the %s variant class', (variant, expectedClass) => {
    const { container } = render(<Badge variant={variant}>Badge</Badge>);
    expect(container.querySelector('span')).toHaveClass(expectedClass);
  });

  it.each(['sm', 'md', 'lg'] as const)('applies the %s size class', (size) => {
    const { container } = render(<Badge size={size}>Badge</Badge>);
    const expected = { sm: 'px-2', md: 'px-2.5', lg: 'px-3' }[size];
    expect(container.querySelector('span')).toHaveClass(expected);
  });

  it('renders a dot when dot is true', () => {
    const { container } = render(<Badge dot>Live</Badge>);
    expect(container.querySelector('span[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('renders only one dot element', () => {
    const { container } = render(<Badge dot>Live</Badge>);
    expect(container.querySelectorAll('span[aria-hidden="true"]')).toHaveLength(1);
  });

  it('does not render a dot by default', () => {
    const { container } = render(<Badge>Plain</Badge>);
    expect(container.querySelector('span[aria-hidden="true"]')).not.toBeInTheDocument();
  });

  it('renders a pill shape when pill is true', () => {
    const { container } = render(<Badge pill>Pill</Badge>);
    expect(container.querySelector('span')).toHaveClass('rounded-full');
  });

  it('renders rounded-md by default', () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.querySelector('span')).toHaveClass('rounded-md');
  });

  it('renders an icon when provided', () => {
    const icon = <svg data-testid="badge-icon" viewBox="0 0 24 24" />;
    render(<Badge icon={icon}>New</Badge>);
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
  });

  it('marks the icon container as decorative', () => {
    const { container } = render(
      <Badge icon={<svg data-testid="badge-icon" viewBox="0 0 24 24" />}>New</Badge>,
    );
    const iconContainer = container.querySelector('span.inline-flex > span.inline-flex');
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(<Badge className="my-badge">Badge</Badge>);
    expect(container.querySelector('span')).toHaveClass('my-badge');
  });

  it('forwards a ref to the span', () => {
    const ref = vi.fn();
    render(<Badge ref={ref}>Badge</Badge>);
    expect(ref).toHaveBeenCalled();
  });
});
