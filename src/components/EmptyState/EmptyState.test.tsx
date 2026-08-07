import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByRole('heading', { name: 'No items' })).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<EmptyState title="No items" description="Add your first item." />);
    expect(screen.getByText('Add your first item.')).toBeInTheDocument();
  });

  it('renders an illustration hidden from the accessibility tree', () => {
    const { container } = render(
      <EmptyState
        title="No items"
        illustration={<svg data-testid="empty-icon" viewBox="0 0 24 24" />}
      />,
    );
    expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it('renders a primary action', () => {
    render(<EmptyState title="No items" action={<button type="button">Add item</button>} />);
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('renders a secondary action', () => {
    render(
      <EmptyState
        title="No items"
        action={<button type="button">Add item</button>}
        secondaryAction={<button type="button">Learn more</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
  });

  it('defaults to a vertical centered layout', () => {
    const { container } = render(<EmptyState title="No items" />);
    expect(container.firstChild).toHaveClass('flex-col');
    expect(container.firstChild).toHaveClass('text-center');
  });

  it('supports a horizontal layout', () => {
    const { container } = render(<EmptyState title="No items" layout="horizontal" />);
    expect(container.firstChild).toHaveClass('flex-row');
    expect(container.firstChild).toHaveClass('text-left');
  });

  it('applies custom className', () => {
    const { container } = render(<EmptyState title="No items" className="my-empty" />);
    expect(container.firstChild).toHaveClass('my-empty');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<EmptyState ref={ref} title="No items" />);
    expect(ref).toHaveBeenCalled();
  });
});
