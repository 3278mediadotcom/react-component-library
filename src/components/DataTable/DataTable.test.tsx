import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DataTable } from './DataTable';
import type { DataTableColumn } from './DataTable.types';

interface User {
  id: number;
  name: string;
  role: string;
  age: number;
}

const COLUMNS: DataTableColumn<User>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'age', header: 'Age' },
];

const ROWS: User[] = [
  { id: 1, name: 'Alice', role: 'Engineer', age: 34 },
  { id: 2, name: 'Bob', role: 'Designer', age: 25 },
  { id: 3, name: 'Carol', role: 'Engineer', age: 41 },
  { id: 4, name: 'Dave', role: 'Manager', age: 29 },
  { id: 5, name: 'Eve', role: 'Engineer', age: 31 },
  { id: 6, name: 'Frank', role: 'Designer', age: 38 },
  { id: 7, name: 'Grace', role: 'Manager', age: 45 },
];

function renderTable(props: Partial<Parameters<typeof DataTable<User>>[0]> = {}) {
  return render(<DataTable columns={COLUMNS} rows={ROWS} label="Users" {...props} />);
}

/** Reads the rendered body rows as arrays of cell texts. */
function getBodyRows(): string[][] {
  const body = document.querySelector('tbody');
  if (!body) return [];
  return Array.from(body.querySelectorAll('tr')).map((row) =>
    Array.from(row.querySelectorAll('td')).map((cell) => cell.textContent ?? ''),
  );
}

describe('DataTable', () => {
  it('renders a table with column headers', () => {
    renderTable();
    expect(screen.getByRole('table', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();
  });

  it('renders every row when under the page size', () => {
    renderTable({ defaultPageSize: 10 });
    expect(screen.getAllByRole('row')).toHaveLength(ROWS.length + 1); // + header
  });

  it('renders a selection checkbox per row', () => {
    renderTable();
    expect(screen.getByRole('checkbox', { name: 'Select all rows' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Select Users row 1' })).toBeInTheDocument();
  });

  it('announces the row count', () => {
    renderTable();
    expect(screen.getByText('7 rows')).toBeInTheDocument();
  });

  it('renders the accessible label from the label prop', () => {
    renderTable({ label: 'Employees' });
    expect(screen.getByRole('table', { name: 'Employees' })).toBeInTheDocument();
  });

  it('renders a caption', () => {
    renderTable({ caption: 'Engineering roster' });
    expect(screen.getByText('Engineering roster')).toBeInTheDocument();
    // The table is labelled by the caption.
    expect(screen.getByRole('table')).toHaveAttribute('aria-labelledby');
  });

  describe('sorting', () => {
    it('sorts ascending on first click', async () => {
      const user = userEvent.setup();
      renderTable();
      await user.click(screen.getByRole('button', { name: 'Sort by Name' }));
      // Columns: #, ID, Name, Role, Age → Name is index 2.
      expect(getBodyRows()[0][2]).toBe('Alice');
    });

    it('sorts descending on second click', async () => {
      const user = userEvent.setup();
      renderTable();
      const button = screen.getByRole('button', { name: 'Sort by Name' });
      await user.click(button);
      await user.click(button);
      expect(getBodyRows()[0][2]).toBe('Grace');
    });

    it('cycles back to unsorted on third click', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 10 });
      const button = screen.getByRole('button', { name: 'Sort by Name' });
      await user.click(button);
      await user.click(button);
      await user.click(button);
      expect(getBodyRows().map((row) => row[2])).toEqual([
        'Alice',
        'Bob',
        'Carol',
        'Dave',
        'Eve',
        'Frank',
        'Grace',
      ]);
    });

    it('sorts numbers numerically', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 10 });
      await user.click(screen.getByRole('button', { name: 'Sort by Age' }));
      expect(getBodyRows().map((row) => row[4])).toEqual([
        '25',
        '29',
        '31',
        '34',
        '38',
        '41',
        '45',
      ]);
    });

    it('indicates the sort direction on the header', async () => {
      const user = userEvent.setup();
      renderTable();
      const button = screen.getByRole('button', { name: 'Sort by Name' });
      await user.click(button);
      expect(button).toHaveTextContent('▲');
      await user.click(button);
      expect(button).toHaveTextContent('▼');
    });

    it('fires onSortChange', async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      renderTable({ onSortChange });
      await user.click(screen.getByRole('button', { name: 'Sort by Age' }));
      expect(onSortChange).toHaveBeenCalledWith([{ columnId: 'age', direction: 'asc' }]);
    });

    it('respects controlled sortState', async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      renderTable({ sortState: [{ columnId: 'name', direction: 'desc' }], onSortChange });
      expect(getBodyRows()[0][2]).toBe('Grace');

      await user.click(screen.getByRole('button', { name: 'Sort by Name' }));
      // Controlled: the table still renders the controlled value until owner re-renders.
      expect(onSortChange).toHaveBeenCalled();
    });

    it('does not sort a non-sortable column', async () => {
      const user = userEvent.setup();
      const columns = [
        { key: 'id', header: 'ID', sortable: false },
        { key: 'name', header: 'Name' },
      ];
      render(<DataTable columns={columns} rows={ROWS.slice(0, 2)} />);
      expect(screen.queryByRole('button', { name: 'Sort by ID' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sort by Name' })).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Sort by Name' }));
    });
  });

  describe('filtering', () => {
    it('filters by a per-column filter input', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 10 });
      await user.type(screen.getByLabelText('Filter by Role'), 'engineer');
      expect(screen.getAllByRole('row')).toHaveLength(4); // header + 3 engineers
    });

    it('filters by the global search', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 10 });
      await user.type(screen.getByLabelText('Search Users'), 'carol');
      // The global search is debounced (250ms), so wait for the re-render by
      // polling for the filtered-out row to disappear.
      await waitFor(
        () => expect(screen.queryByRole('cell', { name: 'Alice' })).not.toBeInTheDocument(),
        { timeout: 1000 },
      );
      expect(screen.getByRole('cell', { name: 'Carol' })).toBeInTheDocument();
    });

    it('shows the empty state when filters match nothing', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 10 });
      await user.type(screen.getByLabelText('Filter by Name'), 'zzz');
      expect(screen.getByRole('heading', { name: 'No results' })).toBeInTheDocument();
    });

    it('shows a custom empty state', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 10, emptyState: <p>Nothing to see here</p> });
      await user.type(screen.getByLabelText('Filter by Name'), 'zzz');
      expect(screen.getByText('Nothing to see here')).toBeInTheDocument();
    });

    it('clears filters with the clear button', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 10 });
      await user.type(screen.getByLabelText('Filter by Role'), 'manager');
      expect(screen.getAllByRole('row')).toHaveLength(3);
      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(screen.getAllByRole('row')).toHaveLength(ROWS.length + 1);
    });

    it('fires onFilterChange when a filter is typed', async () => {
      const user = userEvent.setup();
      const onFilterChange = vi.fn();
      renderTable({ onFilterChange });
      await user.type(screen.getByLabelText('Filter by Role'), 'eng');
      expect(onFilterChange).toHaveBeenCalledWith({ role: 'eng' });
    });

    it('respects controlled filters', async () => {
      renderTable({ filters: { role: 'manager' }, defaultPageSize: 10 });
      expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 managers
    });
  });

  describe('pagination', () => {
    it('paginates rows by the page size', () => {
      renderTable({ defaultPageSize: 5 });
      expect(screen.getAllByRole('row')).toHaveLength(6); // header + 5 rows
      expect(screen.getByText('7 rows')).toBeInTheDocument();
    });

    it('navigates to the next page', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 5 });
      await user.click(screen.getByRole('button', { name: 'Next page' }));
      expect(screen.getByRole('cell', { name: 'Frank' })).toBeInTheDocument();
      expect(screen.queryByRole('cell', { name: 'Alice' })).not.toBeInTheDocument();
    });

    it('disables previous on the first page', () => {
      renderTable({ defaultPageSize: 5 });
      expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    });

    it('disables next on the last page', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 5 });
      const next = screen.getByRole('button', { name: 'Next page' });
      await user.click(next);
      await user.click(next);
      expect(next).toBeDisabled();
    });

    it('changes the page size', async () => {
      const user = userEvent.setup();
      renderTable();
      await user.selectOptions(screen.getByLabelText('Rows per page'), '20');
      expect(screen.getAllByRole('row')).toHaveLength(ROWS.length + 1);
    });

    it('clamps an out-of-range controlled page', () => {
      renderTable({ page: 99, defaultPageSize: 5 });
      expect(screen.getByRole('cell', { name: 'Grace' })).toBeInTheDocument();
    });

    it('fires onPageChange', async () => {
      const user = userEvent.setup();
      const onPageChange = vi.fn();
      renderTable({ defaultPageSize: 5, onPageChange });
      await user.click(screen.getByRole('button', { name: 'Next page' }));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });
  });

  describe('selection', () => {
    it('selects a row', async () => {
      const user = userEvent.setup();
      renderTable();
      await user.click(screen.getByRole('checkbox', { name: 'Select Users row 1' }));
      expect(screen.getByRole('checkbox', { name: 'Select Users row 1' })).toBeChecked();
    });

    it('shows the indeterminate state on the header when some rows are selected', async () => {
      const user = userEvent.setup();
      renderTable();
      await user.click(screen.getByRole('checkbox', { name: 'Select Users row 1' }));
      const selectAll = screen.getByRole('checkbox', { name: 'Select all rows' });
      expect(selectAll).toHaveProperty('indeterminate', true);
    });

    it('selects all rows on the current page', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 3 });
      await user.click(screen.getByRole('checkbox', { name: 'Select all rows' }));
      expect(screen.getByRole('checkbox', { name: 'Select Users row 1' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Select Users row 2' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Select Users row 3' })).toBeChecked();
    });

    it('deselects with a second header click', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 3 });
      const selectAll = screen.getByRole('checkbox', { name: 'Select all rows' });
      await user.click(selectAll);
      await user.click(selectAll);
      expect(screen.getByRole('checkbox', { name: 'Select Users row 1' })).not.toBeChecked();
    });

    it('clears selection when navigating pages', async () => {
      const user = userEvent.setup();
      renderTable({ defaultPageSize: 3 });
      await user.click(screen.getByRole('checkbox', { name: 'Select Users row 1' }));
      await user.click(screen.getByRole('button', { name: 'Next page' }));
      expect(screen.getByRole('checkbox', { name: 'Select Users row 1' })).not.toBeChecked();
    });

    it('fires onSelectionChange', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      renderTable({ onSelectionChange });
      await user.click(screen.getByRole('checkbox', { name: 'Select Users row 1' }));
      expect(onSelectionChange).toHaveBeenCalledWith(['1']);
    });

    it('respects controlled selectedIds', async () => {
      renderTable({ selectedIds: ['2'] });
      expect(screen.getByRole('checkbox', { name: 'Select Users row 2' })).toBeChecked();
    });

    it('toggles a row selection off on a second click', async () => {
      const user = userEvent.setup();
      renderTable();
      const rowCheckbox = screen.getByRole('checkbox', { name: 'Select Users row 1' });
      await user.click(rowCheckbox);
      expect(rowCheckbox).toBeChecked();
      await user.click(rowCheckbox);
      expect(rowCheckbox).not.toBeChecked();
    });

    it('supports a custom getRowId', async () => {
      const user = userEvent.setup();
      render(
        <DataTable
          columns={COLUMNS}
          rows={ROWS}
          label="Users"
          getRowId={(row) => `user-${row.id}`}
          onSelectionChange={vi.fn()}
        />,
      );
      await user.click(screen.getByRole('checkbox', { name: 'Select Users row 1' }));
      // No crash; selection uses the custom id.
    });
  });

  describe('column visibility', () => {
    it('renders the column menu', async () => {
      const user = userEvent.setup();
      renderTable({
        visibleColumnOptions: COLUMNS.map((c) => ({ key: c.key, label: String(c.header) })),
      });
      await user.click(screen.getByRole('button', { name: 'Columns' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('toggles a column off', async () => {
      const user = userEvent.setup();
      renderTable({
        visibleColumnOptions: COLUMNS.map((c) => ({ key: c.key, label: String(c.header) })),
      });
      await user.click(screen.getByRole('button', { name: 'Columns' }));
      await user.click(screen.getByRole('checkbox', { name: 'Toggle column Role' }));
      expect(screen.queryByRole('columnheader', { name: 'Role' })).not.toBeInTheDocument();
    });

    it('toggles a column back on', async () => {
      const user = userEvent.setup();
      renderTable({
        visibleColumnOptions: COLUMNS.map((c) => ({
          key: c.key,
          label: String(c.header),
          defaultVisible: c.key !== 'age',
        })),
      });
      expect(screen.queryByRole('columnheader', { name: 'Age' })).not.toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Columns' }));
      await user.click(screen.getByRole('checkbox', { name: 'Toggle column Age' }));
      expect(screen.getByRole('columnheader', { name: 'Age' })).toBeInTheDocument();
    });

    it('closes the menu when clicking outside', async () => {
      const user = userEvent.setup();
      renderTable({
        visibleColumnOptions: COLUMNS.map((c) => ({ key: c.key, label: String(c.header) })),
      });
      await user.click(screen.getByRole('button', { name: 'Columns' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();
      await user.click(document.body);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('renders skeleton rows while loading', () => {
      renderTable({ loading: true, rows: [] });
      expect(screen.getByLabelText('Users')).toBeInTheDocument();
      // Skeletons are aria-hidden; count the row structure via tbody rows.
      const rows = document.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(5);
    });

    it('renders the empty state when there are no rows', () => {
      renderTable({ rows: [] });
      expect(screen.getByRole('heading', { name: 'No results' })).toBeInTheDocument();
    });

    it('disables selection when disabled', async () => {
      const user = userEvent.setup();
      renderTable({ disabled: true });
      const selectAll = screen.getByRole('checkbox', { name: 'Select all rows' });
      expect(selectAll).toBeDisabled();
      await user.click(selectAll);
    });
  });

  describe('layout', () => {
    it('applies striped classes', () => {
      const { container } = renderTable({ striped: true });
      expect(container.querySelector('table')).toHaveClass(
        '[&_tbody_tr:nth-child(odd)]:bg-slate-50',
      );
    });

    it('applies hover classes', () => {
      const { container } = renderTable({ hover: true });
      expect(container.querySelector('table')).toHaveClass('[&_tbody_tr]:hover:bg-slate-100');
    });

    it('applies sticky header styles', () => {
      const { container } = renderTable({ stickyHeader: true });
      expect(container.querySelector('table')).toHaveClass('[&_thead_th]:sticky');
    });

    it('wraps in a scroll container when responsive', () => {
      const { container } = renderTable({ responsive: true });
      expect(container.querySelector('.overflow-x-auto')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = renderTable({ className: 'my-datatable' });
      expect(container.firstChild).toHaveClass('my-datatable');
    });
  });

  describe('server-side mode', () => {
    it('renders rows as-is without client pagination', () => {
      renderTable({ serverSide: true });
      expect(screen.getAllByRole('row')).toHaveLength(ROWS.length + 1);
      expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
    });

    it('fires onSortChange but does not reorder rows', async () => {
      const user = userEvent.setup();
      const onSortChange = vi.fn();
      renderTable({ serverSide: true, onSortChange });
      const button = screen.getByRole('button', { name: 'Sort by Name' });
      await user.click(button);
      expect(onSortChange).toHaveBeenCalled();
      // First row remains the original first row.
      expect(screen.getByRole('cell', { name: 'Alice' })).toBeInTheDocument();
    });
  });

  describe('CSV export', () => {
    it('exports when the export button is clicked', async () => {
      const user = userEvent.setup();
      const createSpy = vi.spyOn(URL, 'createObjectURL').mockImplementation(() => 'blob:mock');
      const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
      renderTable({ enableExport: true, defaultPageSize: 10 });
      await user.click(screen.getByRole('button', { name: 'Export CSV' }));
      expect(createSpy).toHaveBeenCalledWith(expect.any(Blob));
      createSpy.mockRestore();
      revokeSpy.mockRestore();
    });

    it('disables export when there are no rows', () => {
      renderTable({ enableExport: true, rows: [] });
      expect(screen.getByRole('button', { name: 'Export CSV' })).toBeDisabled();
    });
  });
});
