import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders a horizontal separator by default', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider.tagName).toBe('HR');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders a vertical separator', () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('has an accessible label', () => {
    render(<Divider label="Section break" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'Section break');
  });

  it('defaults to the "Divider" label', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'Divider');
  });

  it.each(['solid', 'dashed', 'dotted'] as const)('applies the %s variant classes', (variant) => {
    const { container } = render(<Divider variant={variant} />);
    expect(container.querySelector('hr')).toHaveClass(
      variant === 'solid' ? 'border-slate-200' : `border-${variant}`,
    );
  });

  it('renders a centered label on horizontal dividers', () => {
    render(<Divider>Continue</Divider>);
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('hides the decorative lines when a label is present', () => {
    const { container } = render(<Divider>Continue</Divider>);
    const decorative = container.querySelectorAll('[aria-hidden="true"]');
    expect(decorative).toHaveLength(2);
  });

  it('applies custom className', () => {
    const { container } = render(<Divider className="my-divider" />);
    expect(container.querySelector('hr')).toHaveClass('my-divider');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Divider ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
