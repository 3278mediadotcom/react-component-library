import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    const { container } = render(<Avatar src="https://example.com/a.png" alt="Ada Lovelace" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/a.png');
  });

  it('has an accessible label from alt', () => {
    render(<Avatar src="https://example.com/a.png" alt="Ada Lovelace" />);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toBeInTheDocument();
  });

  it('uses initials when no image is provided', () => {
    render(<Avatar initials="AL" />);
    expect(screen.getByRole('img')).toHaveTextContent('AL');
  });

  it('hides the initials text from the accessibility tree', () => {
    const { container } = render(<Avatar initials="AL" />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('AL');
  });

  it('uses the label prop as the accessible name', () => {
    render(<Avatar initials="AL" label="Ada Lovelace" />);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toBeInTheDocument();
  });

  it('falls back to initials when the image fails to load', () => {
    const { container } = render(<Avatar src="broken.png" initials="AL" alt="Ada" />);
    const img = container.querySelector('img') as HTMLImageElement;
    fireEvent.error(img);
    expect(screen.getByRole('img')).toHaveTextContent('AL');
  });

  it('falls back to the icon when no initials are provided', () => {
    render(<Avatar icon={<svg data-testid="fallback-icon" viewBox="0 0 24 24" />} />);
    expect(screen.getByTestId('fallback-icon')).toBeInTheDocument();
  });

  it('defaults the label to "Avatar" when nothing is provided', () => {
    render(<Avatar icon={<svg data-testid="f" viewBox="0 0 24 24" />} />);
    expect(screen.getByRole('img', { name: 'Avatar' })).toBeInTheDocument();
  });

  it.each(['circle', 'rounded', 'square'] as const)('applies the %s shape class', (shape) => {
    const { container } = render(<Avatar initials="A" shape={shape} />);
    const expected = {
      circle: 'rounded-full',
      rounded: 'rounded-lg',
      square: 'rounded-none',
    }[shape];
    expect(container.firstChild).toHaveClass(expected);
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('applies the %s size class', (size) => {
    const { container } = render(<Avatar initials="A" size={size} />);
    const expected = {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    }[size];
    expected.split(' ').forEach((cls) => expect(container.firstChild).toHaveClass(cls));
  });

  it.each([
    ['online', 'bg-green-500'],
    ['offline', 'bg-slate-400'],
    ['away', 'bg-amber-500'],
    ['busy', 'bg-red-500'],
  ] as const)('renders a %s status indicator', (status, statusClass) => {
    const { container } = render(<Avatar initials="A" status={status} />);
    const dot = container.querySelector('.absolute');
    expect(dot).toHaveClass(statusClass);
  });

  it('does not render a status dot when status is omitted', () => {
    const { container } = render(<Avatar initials="A" />);
    expect(container.querySelector('.absolute')).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(<Avatar initials="A" className="my-avatar" />);
    expect(container.firstChild).toHaveClass('my-avatar');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Avatar ref={ref} initials="A" />);
    expect(ref).toHaveBeenCalled();
  });
});
