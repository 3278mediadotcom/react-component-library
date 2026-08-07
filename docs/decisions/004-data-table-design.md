# ADR 004 — DataTable Design

## Status

Accepted.

## Decision

`DataTable` is a generic, feature-complete table built on `Table` and the
shared hooks:

- **Generic typing**: `DataTable<Row>` infers column typing from
  `DataTableColumn<Row>[]`; `render: (row: Row) => ReactNode` is fully typed.
- **Client-side mode** by default: sorting (`useSorting`), text filtering,
  global search, pagination (`usePagination`), and row selection
  (`useSelection`).
- **Server-side mode** (`serverSide`): the host owns all data operations and
  the component only renders `rows`/`columns` + fires callbacks.
- **Column visibility**, sticky headers, striped/hover styling, CSV export
  (`enableExport`), and loading skeletons.
- Semantic `<table>` markup with `aria-sort` on sortable headers and a live
  region announcing result counts.

## Reasoning

- Data grids are the most complex surface in the library; a single rich
  component beats a scatter of half-featured tables.
- Client-side defaults make the component work out of the box; `serverSide`
  keeps it viable for real backends.

## Tradeoffs

- Large prop surface (`DataTableProps` ~30 props) — mitigated by sensible
  defaults for every optional prop.
- CSV export pulls in string-generation logic that is intentionally separated
  into `dataTableUtils.ts` so it can be unit-tested in isolation.
