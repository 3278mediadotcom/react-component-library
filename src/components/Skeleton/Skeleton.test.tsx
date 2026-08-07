import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders a placeholder element', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('is hidden from the accessibility tree by default', () => {
    render(<Skeleton />);
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    expect(document.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it('can be announced when decorative is false', () => {
    render(<Skeleton decorative={false} />);
    expect(document.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it.each(['text', 'avatar', 'button', 'card', 'image'] as const)(
    'applies the %s variant dimensions',
    (variant) => {
      const { container } = render(<Skeleton variant={variant} />);
      const el = container.firstChild as HTMLElement;
      const expected = {
        text: 'h-4',
        avatar: 'h-12 w-12',
        button: 'h-10 w-28',
        card: 'h-40 w-full',
        image: 'aspect-video w-full',
      }[variant];
      expected.split(' ').forEach((cls) => expect(el).toHaveClass(cls));
    },
  );

  it.each([
    ['text', 'rounded'],
    ['avatar', 'rounded-full'],
    ['button', 'rounded-lg'],
    ['card', 'rounded-xl'],
    ['image', 'rounded-xl'],
  ] as const)('applies the %s shape class', (variant, shapeClass) => {
    const { container } = render(<Skeleton variant={variant} />);
    expect(container.firstChild).toHaveClass(shapeClass);
  });

  it('pulses by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('applies the wave animation', () => {
    const { container } = render(<Skeleton animation="wave" />);
    expect(container.firstChild).toHaveClass('animate-skeleton-wave');
  });

  it('applies width and height styles', () => {
    const { container } = render(<Skeleton width={80} height="2rem" />);
    expect(container.firstChild).toHaveStyle({ width: '80px', height: '2rem' });
  });

  it('overrides shape with rounded', () => {
    const { container } = render(<Skeleton variant="avatar" rounded />);
    expect(container.firstChild).toHaveClass('rounded-lg');
    expect(container.firstChild).not.toHaveClass('rounded-full');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="my-skeleton" />);
    expect(container.firstChild).toHaveClass('my-skeleton');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Skeleton ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
