import type { HTMLAttributes, ReactNode } from 'react';
import type { SortState } from '../../hooks/useSorting';

/** Alignment for a column. */
export type DataTableAlignment = 'start' | 'center' | 'end';

/** Column visibility option exposed to the toolbar. */
export interface DataTableVisibleColumn {
  /** Column key. */
  key: string;
  /** Label shown in the visibility dropdown. */
  label: string;
  /** Whether the column starts visible. Defaults to `true`. */
  defaultVisible?: boolean;
}

/**
 * Column descriptor for the DataTable.
 */
export interface DataTableColumn<Row> {
  /** Stable key used for sorting, filtering, and column visibility. */
  key: string;
  /** Header label. */
  header: ReactNode;
  /** Cell value renderer. When omitted, falls back to `(row) => row[key]`. */
  render?: (row: Row) => ReactNode;
  /** Cell alignment. Defaults to `'start'`. */
  align?: DataTableAlignment;
  /** Enables click-to-sort. Defaults to `true`. */
  sortable?: boolean;
  /** Enables text filtering. Defaults to `true`. */
  filterable?: boolean;
  /** Prevents the column from shrinking below its content. */
  nowrap?: boolean;
  /** Optional width (any CSS length) applied via `min-width`. */
  width?: string;
  /** Extra classes on the header cell. */
  headerClassName?: string;
  /** Extra classes on body cells. */
  cellClassName?: string;
  /** Optional `aria-label` on the sort button for screen readers. */
  sortLabel?: string;
}

/**
 * Props for the DataTable component.
 */
export interface DataTableProps<Row> extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Column descriptors. */
  columns: DataTableColumn<Row>[];
  /** Data rows. */
  rows: Row[];
  /** Unique row id extractor. Defaults to `(row) => String(row.id)`. */
  getRowId?: (row: Row) => string;
  /** Display label for the table region. Defaults to `'Data table'`. */
  label?: string;
  /** Optional caption rendered above the table. */
  caption?: ReactNode;

  // ---------- Sorting ----------
  /** Controlled sort state (array for multi-sort support). */
  sortState?: SortState[];
  /** Initial sort state (uncontrolled). */
  defaultSortState?: SortState[];
  /** Fires when sort changes. */
  onSortChange?: (sortState: SortState[]) => void;
  /** Allow multi-column sorting (shift-click / dedicated action). */
  multiSort?: boolean;

  // ---------- Filtering ----------
  /** Declarative per-column filter values. */
  filters?: Record<string, string>;
  /** Fires when any filter changes. */
  onFilterChange?: (filters: Record<string, string>) => void;
  /** Placeholder for the global search input. */
  searchPlaceholder?: string;

  // ---------- Pagination ----------
  /** Controlled page. */
  page?: number;
  /** Initial page (uncontrolled). Defaults to `1`. */
  defaultPage?: number;
  /** Controlled page size. */
  pageSize?: number;
  /** Initial page size (uncontrolled). Defaults to `10`. */
  defaultPageSize?: number;
  /** Per-page options. Defaults to `[10, 20, 50]`. */
  pageSizeOptions?: number[];
  /** Fires when the page changes. */
  onPageChange?: (page: number) => void;
  /** Fires when the page size changes. */
  onPageSizeChange?: (pageSize: number) => void;

  // ---------- Selection ----------
  /** Controlled set of selected row ids. */
  selectedIds?: string[];
  /** Fires when the selection changes. */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Label describing what the rows are (e.g. "users"). */
  selectionLabel?: string;

  // ---------- States ----------
  /** Renders skeleton rows while `true`. */
  loading?: boolean;
  /** Custom empty-state content shown when there are no rows. */
  emptyState?: ReactNode;
  /** Disables all interactivity. */
  disabled?: boolean;

  // ---------- Columns & layout ----------
  /** Initially-hidden or renamable columns for the visibility menu. */
  visibleColumnOptions?: DataTableVisibleColumn[];
  /** Controlled visible column keys. */
  visibleColumns?: string[];
  /** Fires when visible columns change. */
  onVisibleColumnsChange?: (keys: string[]) => void;
  /** Row density. Defaults to `'md'`. */
  size?: 'sm' | 'md' | 'lg';
  /** Sticky header with vertical scroll. */
  stickyHeader?: boolean;
  /** Maximum height with vertical scroll. */
  maxHeight?: string | number;
  /** Wrap the table in a horizontal overflow container. */
  responsive?: boolean;
  /** Striped rows. */
  striped?: boolean;
  /** Row hover highlight. */
  hover?: boolean;

  // ---------- Server-side mode ----------
  /** Disables client-side sorting/filtering/pagination (the owner controls data). */
  serverSide?: boolean;

  // ---------- Export ----------
  /** Shows the CSV export button. */
  enableExport?: boolean;
  /** Export file name (without extension). Defaults to `'data'`. */
  exportFilename?: string;
  /** Excludes columns from the CSV export by key. */
  exportExcludeColumns?: string[];

  /** Additional CSS classes on the root. */
  className?: string;
}
