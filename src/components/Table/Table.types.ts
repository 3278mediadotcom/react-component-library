import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

/** Visual density of the table. */
export type TableSize = 'sm' | 'md' | 'lg';

/** Alignment of a cell or column. */
export type TableAlignment = 'start' | 'center' | 'end';

/** Column descriptor used by the high-level `columns` API. */
export interface TableColumn<Row> {
  /** Stable accessor key used to resolve the cell value. */
  key: string;
  /** Header label. */
  header: ReactNode;
  /** Value cell renderer. Defaults to `(row) => String(row[key])`. */
  render?: (row: Row) => ReactNode;
  /** Cell alignment. Defaults to `'start'`. */
  align?: TableAlignment;
  /** Prevent the column from shrinking. */
  nowrap?: boolean;
  /** Optional className for the header cell. */
  headerClassName?: string;
  /** Optional className for body cells. */
  cellClassName?: string;
}

/**
 * Semantic props for the base Table (raw `<table>` children).
 */
export interface TableProps extends Omit<HTMLAttributes<HTMLTableElement>, 'className'> {
  /** Optional accessible caption. */
  caption?: ReactNode;
  /** Striped row backgrounds. Defaults to `false`. */
  striped?: boolean;
  /** Hover highlight on rows. Defaults to `false`. */
  hover?: boolean;
  /** Compact density. Defaults to `'md'`. */
  size?: TableSize;
  /** Table fills its container width. Defaults to `true`. */
  fullWidth?: boolean;
  /** Sticky header on vertical scroll. Requires `maxHeight`. */
  stickyHeader?: boolean;
  /** Maximum height with vertical scroll (any CSS length). */
  maxHeight?: string | number;
  /** Wraps the table in a horizontally scrollable container. */
  responsive?: boolean;
  /** Children (typically `thead`/`tbody`/`tfoot`). */
  children: ReactNode;
  /** Additional CSS classes on the root. */
  className?: string;
}

/** Props for a semantic `<th>` cell. */
export interface TableHeaderCellProps extends Omit<
  ThHTMLAttributes<HTMLTableCellElement>,
  'align' | 'className'
> {
  /** Cell alignment. Defaults to `'start'`. */
  align?: TableAlignment;
  /** Visual density. Defaults to `'md'`. */
  size?: TableSize;
  /** Additional CSS classes on the cell. */
  className?: string;
}

/** Props for a semantic `<td>` cell. */
export interface TableCellProps extends Omit<
  TdHTMLAttributes<HTMLTableCellElement>,
  'align' | 'className'
> {
  /** Cell alignment. Defaults to `'start'`. */
  align?: TableAlignment;
  /** Visual density. Defaults to `'md'`. */
  size?: TableSize;
  /** Additional CSS classes on the cell. */
  className?: string;
}
