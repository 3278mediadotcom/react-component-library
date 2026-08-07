import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Table, TableCell, TableHeaderCell } from './Table';

function renderTable(props = {}) {
  return render(
    <Table {...props}>
      <thead>
        <tr>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell align="end">Amount</TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        <tr>
          <TableCell>Alice</TableCell>
          <TableCell align="end">$10</TableCell>
        </tr>
        <tr>
          <TableCell>Bob</TableCell>
          <TableCell align="end">$20</TableCell>
        </tr>
      </tbody>
    </Table>,
  );
}

describe('Table', () => {
  it('renders a semantic table', () => {
    renderTable();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders accessible column headers', () => {
    renderTable();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toBeInTheDocument();
  });

  it('renders row data cells', () => {
    renderTable();
    expect(screen.getByRole('cell', { name: 'Alice' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Bob' })).toBeInTheDocument();
  });

  it('renders a caption', () => {
    renderTable({ caption: 'Team budget' });
    expect(screen.getByRole('caption')).toHaveTextContent('Team budget');
  });

  it('applies full width by default', () => {
    const { container } = renderTable();
    expect(container.querySelector('table')).toHaveClass('w-full');
  });

  it('can opt out of full width', () => {
    const { container } = renderTable({ fullWidth: false });
    expect(container.querySelector('table')).not.toHaveClass('w-full');
  });

  it('applies striped rows', () => {
    const { container } = renderTable({ striped: true });
    expect(container.querySelector('table')).toHaveClass('[&_tbody_tr:nth-child(odd)]:bg-slate-50');
  });

  it('applies hover styles', () => {
    const { container } = renderTable({ hover: true });
    expect(container.querySelector('table')).toHaveClass('[&_tbody_tr:hover]:bg-slate-100');
  });

  it('applies sticky header styles', () => {
    const { container } = renderTable({ stickyHeader: true });
    expect(container.querySelector('table')).toHaveClass('[&_thead_th]:sticky');
  });

  it('sets a max height style', () => {
    const { container } = renderTable({ maxHeight: 300 });
    expect(container.querySelector('table')).toHaveStyle({ maxHeight: '300px' });
  });

  it('wraps in a horizontally scrollable container when responsive', () => {
    const { container } = renderTable({ responsive: true });
    expect(container.querySelector('.overflow-x-auto')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('aligns header cells', () => {
    renderTable();
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveClass('text-right');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass('text-left');
  });

  it('aligns data cells', () => {
    renderTable();
    expect(screen.getByRole('cell', { name: '$10' })).toHaveClass('text-right');
    expect(screen.getByRole('cell', { name: 'Alice' })).toHaveClass('text-left');
  });

  it('applies density classes', () => {
    const { container } = renderTable({ size: 'sm' });
    expect(container.querySelector('table')).toHaveClass(
      '[&_th]:px-3 [&_th]:py-1.5 [&_th]:text-xs [&_td]:px-3 [&_td]:py-1.5 [&_td]:text-xs',
    );
  });

  it('applies custom className', () => {
    const { container } = renderTable({ className: 'my-table' });
    expect(container.querySelector('table')).toHaveClass('my-table');
  });

  it('forwards a ref', () => {
    const ref = vi.fn();
    render(<Table ref={ref}>content</Table>);
    expect(ref).toHaveBeenCalled();
  });
});
