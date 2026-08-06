import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders a navigation landmark', () => {
    render(<Pagination pageCount={5} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('uses a custom label', () => {
    render(<Pagination pageCount={5} label="Results" />);
    expect(screen.getByRole('navigation', { name: 'Results' })).toBeInTheDocument();
  });

  it('marks the current page with aria-current', () => {
    render(<Pagination pageCount={5} defaultPage={3} />);
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
  });

  it('fires onPageChange when a page is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination pageCount={5} defaultPage={1} onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('moves to the next page', async () => {
    const user = userEvent.setup();
    render(<Pagination pageCount={5} defaultPage={2} />);
    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
  });

  it('moves to the previous page', async () => {
    const user = userEvent.setup();
    render(<Pagination pageCount={5} defaultPage={3} />);
    await user.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
  });

  it('disables the previous button on the first page', () => {
    render(<Pagination pageCount={5} defaultPage={1} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    render(<Pagination pageCount={5} defaultPage={5} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('jumps to the first page', async () => {
    const user = userEvent.setup();
    render(<Pagination pageCount={5} defaultPage={3} />);
    await user.click(screen.getByRole('button', { name: 'First page' }));
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
  });

  it('jumps to the last page', async () => {
    const user = userEvent.setup();
    render(<Pagination pageCount={5} defaultPage={1} />);
    await user.click(screen.getByRole('button', { name: 'Last page' }));
    expect(screen.getByRole('button', { name: 'Page 5' })).toHaveAttribute('aria-current', 'page');
  });

  it('collapses a large page count with ellipses', () => {
    render(<Pagination pageCount={15} defaultPage={8} />);
    expect(screen.getByRole('button', { name: 'Go to page 15' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 8' })).toBeInTheDocument();
    // Ellipsis are aria-hidden spans, not buttons.
    expect(document.querySelectorAll('span[aria-hidden="true"]')).toHaveLength(2);
  });

  it('does not render ellipses for small page counts', () => {
    render(<Pagination pageCount={5} defaultPage={3} />);
    expect(document.querySelector('span[aria-hidden="true"]')).not.toBeInTheDocument();
  });

  it('does not render current page label buttons for every page item', () => {
    // Only the single current page has aria-current.
    render(<Pagination pageCount={5} defaultPage={3} />);
    expect(document.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  });

  it('disables all buttons when disabled', () => {
    render(<Pagination pageCount={5} disabled />);
    screen.getAllByRole('button').forEach((b) => expect(b).toBeDisabled());
  });

  it('does not navigate when disabled', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination pageCount={5} defaultPage={1} disabled onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('supports controlled usage', () => {
    const onPageChange = vi.fn();
    render(<Pagination pageCount={5} page={2} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
  });

  it('applies custom className', () => {
    const { container } = render(<Pagination pageCount={5} className="my-pagination" />);
    expect(container.querySelector('nav')).toHaveClass('my-pagination');
  });

  it('renders a single page without extraneous ellipses', () => {
    render(<Pagination pageCount={1} />);
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument();
  });
});
