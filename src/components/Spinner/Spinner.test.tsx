import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders an svg element', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('defaults to a "Loading" label announced via aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('announces a custom label', () => {
    render(<Spinner label="Saving…" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving…');
  });

  it('uses aria-live="polite" for screen reader announcements', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('is hidden from the accessibility tree when decorative', () => {
    const { container } = render(<Spinner decorative />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('applies the %s size class', (size) => {
    const { container } = render(<Spinner size={size} />);
    const svg = container.querySelector('svg');
    const expected = {
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-10 w-10',
    }[size];
    expect(svg).toHaveClass(expected);
  });

  it.each([
    ['primary', 'stroke-blue-600'],
    ['secondary', 'stroke-slate-500'],
    ['light', 'stroke-white'],
    ['dark', 'stroke-slate-900'],
  ] as const)('applies the %s variant styles', (variant, expectedClass) => {
    const { container } = render(<Spinner variant={variant} />);
    expect(container.querySelector('svg path')).toHaveClass(expectedClass);
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="my-spinner" />);
    expect(container.querySelector('svg')).toHaveClass('my-spinner');
  });

  it('has an animation class', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toHaveClass('animate-spin');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Spinner ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
