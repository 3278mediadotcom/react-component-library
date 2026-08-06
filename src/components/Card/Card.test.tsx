import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders an article element', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it.each([
    ['default', 'bg-white'],
    ['outlined', 'border-2'],
    ['elevated', 'shadow-lg'],
  ] as const)('applies the %s variant', (variant, expectedClass) => {
    const { container } = render(<Card variant={variant}>Content</Card>);
    expect(container.querySelector('article')).toHaveClass(expectedClass);
  });

  it.each([
    ['none', 'p-0'],
    ['sm', 'p-3'],
    ['md', 'p-5'],
    ['lg', 'p-7'],
  ] as const)('applies the %s padding', (padding, expectedClass) => {
    const { container } = render(<Card padding={padding}>Content</Card>);
    expect(container.querySelector('div')).toHaveClass(expectedClass);
  });

  it('renders a title', () => {
    render(<Card title="Profile">Body</Card>);
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders a subtitle', () => {
    render(
      <Card title="Profile" subtitle="Personal details">
        Body
      </Card>,
    );
    expect(screen.getByText('Personal details')).toBeInTheDocument();
  });

  it('does not render a header without title or subtitle', () => {
    const { container } = render(<Card>Body</Card>);
    expect(container.querySelector('header')).not.toBeInTheDocument();
  });

  it('renders a footer', () => {
    render(<Card footer="Footer text">Body</Card>);
    expect(screen.getByText('Footer text')).toBeInTheDocument();
  });

  it('uses footer element for footer content', () => {
    const { container } = render(<Card footer={<button>Save</button>}>Body</Card>);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('applies hoverable classes', () => {
    const { container } = render(<Card hoverable>Content</Card>);
    expect(container.querySelector('article')).toHaveClass('transition-shadow');
  });

  it('does not apply hoverable classes by default', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector('article')).not.toHaveClass('hover:shadow-lg');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="my-card">Content</Card>);
    expect(container.querySelector('article')).toHaveClass('my-card');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Content</Card>);
    expect(ref).toHaveBeenCalled();
  });
});
