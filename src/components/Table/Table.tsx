import { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import type {
  TableAlignment,
  TableCellProps,
  TableHeaderCellProps,
  TableProps,
  TableSize,
} from './Table.types';

const SIZE_CLASSES: Record<TableSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3.5 text-base',
};

const ROOT_SIZE_CLASSES: Record<TableSize, string> = {
  sm: '[&_th]:px-3 [&_th]:py-1.5 [&_th]:text-xs [&_td]:px-3 [&_td]:py-1.5 [&_td]:text-xs',
  md: '[&_th]:px-4 [&_th]:py-2.5 [&_th]:text-sm [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-sm',
  lg: '[&_th]:px-5 [&_th]:py-3.5 [&_th]:text-base [&_td]:px-5 [&_td]:py-3.5 [&_td]:text-base',
};

const ALIGNMENT_CLASSES: Record<TableAlignment, string> = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right',
};

/**
 * Table — a semantic table wrapper.
 *
 * Renders a native `<table>` element with cross-browser layout handling:
 * `border-collapse: separate` + `border-spacing: 0` keeps borders intact
 * under `border-collapse: collapse` quirks. Rows and cells remain native
 * semantics for assistive tech.
 *
 * Pair with the exported `TableHeaderCell` (`<th>`) and `TableCell` (`<td>`)
 * helpers for consistent alignment and density.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    caption,
    striped = false,
    hover = false,
    size = 'md',
    fullWidth = true,
    stickyHeader = false,
    maxHeight,
    responsive = false,
    children,
    className,
    style,
    ...rest
  },
  ref,
) {
  const table = (
    <table
      ref={ref}
      className={classNames(
        'border-separate border-spacing-0',
        fullWidth && 'w-full',
        '[&_th]:border-b [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-slate-500 dark:[&_th]:border-slate-800 dark:[&_th]:bg-slate-900 dark:[&_th]:text-slate-400',
        `[&_td]:border-b [&_td]:border-slate-200 dark:[&_td]:border-slate-800`,
        '[&_tr:last-child_td]:border-b-0',
        ROOT_SIZE_CLASSES[size],
        striped &&
          '[&_tbody_tr:nth-child(odd)]:bg-slate-50 dark:[&_tbody_tr:nth-child(odd)]:bg-slate-900/50',
        hover &&
          '[&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-slate-100 dark:[&_tbody_tr:hover]:bg-slate-800/50',
        stickyHeader && '[&_thead_th]:sticky [&_thead_th]:top-0',
        className,
      )}
      style={
        maxHeight !== undefined
          ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight, ...style }
          : style
      }
      {...rest}
    >
      {caption && (
        <caption className="px-4 py-2 text-left text-sm text-slate-500 dark:text-slate-400">
          {caption}
        </caption>
      )}
      {children}
    </table>
  );

  if (responsive) {
    return <div className="overflow-x-auto">{table}</div>;
  }

  return table;
});

/** Semantic `<th>` helper with alignment and density wiring. */
export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  function TableHeaderCell({ align = 'start', size = 'md', className, ...rest }, ref) {
    return (
      <th
        ref={ref}
        scope="col"
        className={classNames(
          'border-b border-slate-200 bg-slate-50 font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400',
          ALIGNMENT_CLASSES[align],
          SIZE_CLASSES[size],
          className,
        )}
        {...rest}
      />
    );
  },
);

/** Semantic `<td>` helper with alignment and density wiring. */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { align = 'start', size = 'md', className, ...rest },
  ref,
) {
  return (
    <td
      ref={ref}
      className={classNames(
        'border-b border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300',
        ALIGNMENT_CLASSES[align],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    />
  );
});

export default Table;
