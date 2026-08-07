# DataTable

A feature-rich data table combining sorting, filtering, pagination, selection,
loading/empty states, column visibility, and CSV export.

## Usage

```tsx
import { DataTable } from '../../components/DataTable';
import type { DataTableColumn } from '../../components/DataTable';

interface User {
  id: number;
  name: string;
  role: string;
}

const columns: DataTableColumn<User>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
];

<DataTable columns={columns} rows={users} label="Users" />;
```

## Props

| Prop                   | Type                          | Default         | Description                    |
| ---------------------- | ----------------------------- | --------------- | ------------------------------ |
| `columns`              | `DataTableColumn[]`           | — (req)         | Column descriptors.            |
| `rows`                 | `Row[]`                       | — (req)         | Data rows.                     |
| `getRowId`             | `(row) => string`             | `row.id`        | Row id extractor.              |
| `label`                | `string`                      | `'Data table'`  | Table accessible name.         |
| `caption`              | `ReactNode`                   | —               | Caption (labels the table).    |
| `sortState`            | `SortState[]`                 | —               | Controlled sort.               |
| `defaultSortState`     | `SortState[]`                 | —               | Initial sort (uncontrolled).   |
| `onSortChange`         | `(SortState[]) => void`       | —               | Sort change event.             |
| `multiSort`            | `boolean`                     | `false`         | Multi-column sorting.          |
| `filters`              | `Record<string, string>`      | —               | Controlled per-column filters. |
| `onFilterChange`       | `(filters) => void`           | —               | Filter change event.           |
| `searchPlaceholder`    | `string`                      | `'Search…'`     | Global search placeholder.     |
| `page` / `pageSize`    | `number`                      | —               | Controlled pagination.         |
| `defaultPage`          | `number`                      | `1`             | Initial page.                  |
| `defaultPageSize`      | `number`                      | `10`            | Initial page size.             |
| `pageSizeOptions`      | `number[]`                    | `[10, 20, 50]`  | Per-page options.              |
| `onPageChange`         | `(page) => void`              | —               | Page change event.             |
| `onPageSizeChange`     | `(size) => void`              | —               | Page size change event.        |
| `selectedIds`          | `string[]`                    | —               | Controlled selection.          |
| `onSelectionChange`    | `(ids) => void`               | —               | Selection change event.        |
| `selectionLabel`       | `string`                      | `'rows'`        | What rows are (for a11y).      |
| `loading`              | `boolean`                     | `false`         | Skeleton rows.                 |
| `emptyState`           | `ReactNode`                   | built-in        | Custom empty content.          |
| `disabled`             | `boolean`                     | `false`         | Disables interactivity.        |
| `visibleColumnOptions` | `DataTableVisibleColumn[]`    | —               | Column visibility menu.        |
| `visibleColumns`       | `string[]`                    | —               | Controlled visible keys.       |
| `onVisibleColumnsChange`| `(keys) => void`             | —               | Visibility change event.       |
| `size`                 | `'sm' \| 'md' \| 'lg'`        | `'md'`          | Row density.                   |
| `stickyHeader`         | `boolean`                     | `false`         | Sticky header.                 |
| `maxHeight`            | `string \| number`            | —               | Vertical scroll limit.         |
| `responsive`           | `boolean`                     | `false`         | Horizontal overflow wrapper.   |
| `striped` / `hover`    | `boolean`                     | `false`         | Row styling.                   |
| `serverSide`           | `boolean`                     | `false`         | Owner controls the pipeline.   |
| `enableExport`         | `boolean`                     | `false`         | CSV export button.             |
| `exportFilename`       | `string`                      | `'data'`        | CSV file name.                 |
| `exportExcludeColumns` | `string[]`                    | `[]`            | Columns excluded from CSV.     |
| `className`            | `string`                      | —               | Additional root classes.       |

## Controlled vs. uncontrolled usage

Every stateful surface follows the library convention:

```tsx
// Uncontrolled — DataTable owns the state.
<DataTable columns={cols} rows={rows} defaultSortState={[{ columnId: 'name', direction: 'asc' }]} />

// Controlled — the owner owns the state and re-renders the DataTable.
<DataTable
  columns={cols}
  rows={rows}
  sortState={sort}
  onSortChange={setSort}
  page={page}
  onPageChange={setPage}
  selectedIds={selected}
  onSelectionChange={setSelected}
/>;
```

When you pass the controlled value, the DataTable stops updating that value
itself and only reports changes through the `onChange` callback.

## Column rendering

```tsx
const columns: DataTableColumn<User>[] = [
  { key: 'name', header: 'Name', render: (row) => <strong>{row.name}</strong> },
  { key: 'status', header: 'Status', align: 'center', nowrap: true },
];
```

- `render` replaces the raw cell value everywhere (display, filtering, CSV).
- `align` (`start | center | end`), `nowrap`, and `width` control layout.
- `sortable: false` and `filterable: false` opt individual columns out.

## Server-side integration

Pass `serverSide` and own the entire pipeline:

```tsx
const handleSortChange = (sort) => fetchUsers({ sort, page, pageSize });

<DataTable
  serverSide
  columns={columns}
  rows={serverRows}
  sortState={sort}
  onSortChange={handleSortChange}
  page={page}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>;
```

Client-side sorting, filtering, and pagination are disabled; the DataTable
renders exactly the rows you give it.

## Keyboard interactions

| Key       | Action                                              |
| --------- | --------------------------------------------------- |
| `Tab`     | Moves between the toolbar, sort buttons, checkboxes, and page controls (native focus order). |
| `Enter`   | Activates a sort button.                            |
| `Space`   | Toggles a focused checkbox or sort button.          |
| `Arrow…`  | Native text-editing inside filter/search inputs.    |

## Accessibility

- A real `<table>` with `scope="col"` header cells.
- Selection checkboxes have explicit labels (`Select all rows`,
  `Select Users row N`).
- Sort buttons expose `aria-label` (e.g. `Sort by Name`).
- The row-count footer uses `aria-live="polite"` so count changes are
  announced.
- Skeletons during `loading` are `aria-hidden`; the footer announces
  `Loading…`.

## Performance considerations

- The data pipeline (`filter → sort → paginate`) is memoized, so it only
  recomputes when inputs change.
- Global search is debounced (250ms) to avoid filtering on every keystroke.
- Avoid large `rows` + `loading` toggles on every keystroke toward the
  server-side pattern for very large datasets.

## CSV export

`enableExport` shows an "Export CSV" button that downloads all *filtered and
sorted* rows. `exportExcludeColumns` removes columns (e.g. an action column).

## Design decisions

- Built on the library's shared hooks (`useSorting`, `useControllableState`)
  and primitives (`Checkbox`, `Pagination`, `Skeleton`, `EmptyState`) rather
  than embedding the logic inline.
- Filtering/search flatten cell values to a lowercase string, so renderers
  that return React nodes degrade gracefully.
- Header checkboxes reflect `all` / `some` / `none` selection states.

## Known limitations

- Per-column filters are text `contains` matches; no date/range operators.
- Multi-sort ordering is by click order and rendered in that order.
- The column visibility menu is a simple checkbox popover (not a drag list).