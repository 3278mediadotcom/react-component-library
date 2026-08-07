import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { useStableId } from '../../utils/ids';
import { useSorting } from '../../hooks/useSorting';
import { useControllableState } from '../../hooks/useControllableState';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Checkbox } from '../Checkbox';
import { Pagination } from '../Pagination';
import { Skeleton } from '../Skeleton';
import { EmptyState } from '../EmptyState';
import { filterRows, getCellValue, toCsv, downloadCsv } from './dataTableUtils';
import type { DataTableColumn, DataTableProps } from './DataTable.types';

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3.5 text-base',
} as const;

const ALIGNMENT_CLASSES = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right',
} as const;

const SORT_INDICATORS = {
  asc: '▲',
  desc: '▼',
} as const;

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50];

/**
 * DataTable — a feature-rich data table.
 *
 * Combines sorting, filtering, pagination, selection, loading/empty states,
 * column visibility, CSV export, and controlled/uncontrolled modes into one
 * component built on the library's shared hooks and primitives.
 *
 * - Controlled vs. uncontrolled: every state surface accepts a controlled
 *   value + `onChange` pair OR an initial/default value.
 * - Accessibility: a real `<table>`, column headers via `scope="col"`,
 *   selection checkboxes with row labels, and sortable headers as buttons.
 * - Server mode: pass `serverSide` and own the entire pipeline (rows arrive
 *   pre-sorted/filtered/paginated).
 */
export function DataTable<Row>(props: DataTableProps<Row>) {
  const {
    columns,
    rows,
    getRowId,
    label = 'Data table',
    caption,

    sortState: controlledSortState,
    defaultSortState,
    onSortChange,
    multiSort = false,

    filters: controlledFilters,
    onFilterChange,
    searchPlaceholder = 'Search…',

    page: controlledPage,
    defaultPage = 1,
    pageSize: controlledPageSize,
    defaultPageSize = DEFAULT_PAGE_SIZE_OPTIONS[0],
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    onPageChange,
    onPageSizeChange,

    selectedIds: controlledSelectedIds,
    onSelectionChange,
    selectionLabel = 'rows',

    loading = false,
    emptyState,
    disabled = false,

    visibleColumnOptions,
    visibleColumns: controlledVisibleColumns,
    onVisibleColumnsChange,
    size = 'md',
    stickyHeader = false,
    maxHeight,
    responsive = false,
    striped = false,
    hover = false,

    serverSide = false,

    enableExport = false,
    exportFilename = 'data',
    exportExcludeColumns = [],

    className,
    ...rest
  } = props;

  // ---------- Stable ids ----------
  const captionId = useStableId('datatable-caption');
  const baseId = useStableId('datatable');

  // ---------- Sorting ----------
  // useSorting owns the internal state and reports every change via onChange.
  // In controlled mode the parent re-renders with `sortState`, which shadows
  // the internal state for rendering.
  const { sortState: internalSortState, toggleSort } = useSorting({
    multiSort,
    initialSort: defaultSortState,
    onChange: (next) => onSortChange?.(next),
  });

  const effectiveSortState = controlledSortState ?? internalSortState;

  const handleToggleSort = useCallback(
    (column: DataTableColumn<Row>) => {
      if (disabled) return;
      // In server-side mode we still report the sort intent; the owner
      // re-fetches and passes back pre-sorted rows.
      toggleSort(column.key);
    },
    [disabled, toggleSort],
  );

  // ---------- Filtering ----------
  const [internalFilters, setInternalFilters] = useState<Record<string, string>>({});
  const [resolvedFilters, setResolvedFilters] = useControllableState<Record<string, string>>({
    value: controlledFilters,
    defaultValue: internalFilters,
    onChange: (next) => onFilterChange?.(next),
  });
  const effectiveFilters = controlledFilters ?? resolvedFilters ?? internalFilters;

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      if (disabled || serverSide) return;
      const next = { ...effectiveFilters, [key]: value };
      setInternalFilters(next);
      setResolvedFilters(next);
    },
    [disabled, serverSide, effectiveFilters, setResolvedFilters],
  );

  const clearFilters = useCallback(() => {
    setInternalFilters({});
    setResolvedFilters({});
    setSearch('');
  }, [setResolvedFilters]);

  // ---------- Pagination ----------
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [resolvedPage, setResolvedPage] = useControllableState<number>({
    value: controlledPage,
    defaultValue: internalPage,
    onChange: (next) => onPageChange?.(next),
  });
  const effectivePage = controlledPage ?? resolvedPage ?? internalPage;

  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const [resolvedPageSize, setResolvedPageSize] = useControllableState<number>({
    value: controlledPageSize,
    defaultValue: internalPageSize,
    onChange: (next) => onPageSizeChange?.(next),
  });
  const effectivePageSize = controlledPageSize ?? resolvedPageSize ?? internalPageSize;

  // ---------- Selection ----------
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const [resolvedSelected, setResolvedSelected] = useControllableState<string[]>({
    value: controlledSelectedIds,
    defaultValue: internalSelected,
    onChange: (next) => onSelectionChange?.(next),
  });
  const effectiveSelected = controlledSelectedIds ?? resolvedSelected ?? internalSelected;
  const selectedSet = useMemo(() => new Set(effectiveSelected), [effectiveSelected]);

  const defaultGetRowId = useCallback((row: Row) => String((row as { id?: unknown }).id ?? ''), []);
  const resolveRowId = getRowId ?? defaultGetRowId;

  const updateSelection = useCallback(
    (next: string[]) => {
      setInternalSelected(next);
      setResolvedSelected(next);
    },
    [setResolvedSelected],
  );

  const toggleRowSelection = useCallback(
    (rowId: string) => {
      if (disabled) return;
      const next = new Set(selectedSet);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      updateSelection(Array.from(next));
    },
    [disabled, selectedSet, updateSelection],
  );

  // ---------- Column visibility ----------
  const visibleKeyOptions = useMemo<{ key: string; label: string; defaultVisible?: boolean }[]>(
    () => visibleColumnOptions ?? columns.map((c) => ({ key: c.key, label: String(c.header) })),
    [columns, visibleColumnOptions],
  );
  const defaultVisibleKeys = useMemo(
    () =>
      visibleKeyOptions
        .filter((option) => option.defaultVisible !== false)
        .map((option) => option.key),
    [visibleKeyOptions],
  );
  const [internalVisibleKeys, setInternalVisibleKeys] = useState<string[]>(defaultVisibleKeys);
  const [resolvedVisibleKeys, setResolvedVisibleKeys] = useControllableState<string[]>({
    value: controlledVisibleColumns,
    defaultValue: internalVisibleKeys,
    onChange: (next) => onVisibleColumnsChange?.(next),
  });
  const visibleKeys = controlledVisibleColumns ?? resolvedVisibleKeys ?? internalVisibleKeys;

  const toggleColumnVisibility = useCallback(
    (key: string) => {
      if (disabled) return;
      const next = visibleKeys.includes(key)
        ? visibleKeys.filter((k) => k !== key)
        : [...visibleKeys, key];
      setInternalVisibleKeys(next);
      setResolvedVisibleKeys(next);
    },
    [disabled, setResolvedVisibleKeys, visibleKeys],
  );

  // ---------- Column visibility menu ----------
  const [visibilityMenuOpen, setVisibilityMenuOpen] = useState(false);
  const visibilityMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(visibilityMenuRef, () => setVisibilityMenuOpen(false), visibilityMenuOpen);

  // ---------- Derived data pipeline ----------
  const visibleColumns = useMemo(
    () => columns.filter((column) => visibleKeys.includes(column.key)),
    [columns, visibleKeys],
  );

  const filteredRows = useMemo(() => {
    if (serverSide) return rows;
    return filterRows(rows, columns, effectiveFilters, debouncedSearch);
  }, [columns, debouncedSearch, effectiveFilters, rows, serverSide]);

  const sortedRows = useMemo(() => {
    if (serverSide || effectiveSortState.length === 0) return filteredRows;

    const sorted = [...filteredRows];
    sorted.sort((a, b) => {
      for (const sort of effectiveSortState) {
        const column = columns.find((c) => c.key === sort.columnId);
        if (!column) continue;
        const result = compareValues(getCellValue(a, column), getCellValue(b, column));
        if (result !== 0) {
          return sort.direction === 'asc' ? result : -result;
        }
      }
      return 0;
    });
    return sorted;
  }, [columns, effectiveSortState, filteredRows, serverSide]);

  const totalCount = serverSide ? rows.length : sortedRows.length;
  const safePageCount = Math.max(1, Math.ceil(totalCount / effectivePageSize));
  const safePage = Math.min(Math.max(effectivePage, 1), safePageCount);

  const pageRows = useMemo(() => {
    if (serverSide) return rows;
    const start = (safePage - 1) * effectivePageSize;
    return sortedRows.slice(start, start + effectivePageSize);
  }, [effectivePageSize, rows, safePage, serverSide, sortedRows]);

  // Row ids for the currently displayed page (used by selection + header checkbox).
  const visibleRowIds = useMemo(
    () => pageRows.map((row) => resolveRowId(row)),
    [pageRows, resolveRowId],
  );

  const allVisibleSelected =
    visibleRowIds.length > 0 && visibleRowIds.every((id) => selectedSet.has(id));
  const someVisibleSelected = visibleRowIds.some((id) => selectedSet.has(id));

  const toggleAllRows = useCallback(() => {
    if (disabled || visibleRowIds.length === 0) return;
    const next = new Set(selectedSet);
    if (allVisibleSelected) {
      visibleRowIds.forEach((id) => next.delete(id));
    } else {
      visibleRowIds.forEach((id) => next.add(id));
    }
    updateSelection(Array.from(next));
  }, [allVisibleSelected, disabled, selectedSet, updateSelection, visibleRowIds]);

  const goToPage = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 1), safePageCount);
      setInternalPage(clamped);
      setResolvedPage(clamped);
      setInternalSelected([]);
    },
    [safePageCount, setResolvedPage],
  );

  const changePageSize = useCallback(
    (nextSize: number) => {
      setInternalPageSize(nextSize);
      setResolvedPageSize(nextSize);
      goToPage(1);
    },
    [goToPage, setResolvedPageSize],
  );

  // ---------- CSV export ----------
  const handleExport = useCallback(() => {
    const csv = toCsv(columns, sortedRows, exportExcludeColumns);
    downloadCsv(csv, exportFilename);
  }, [columns, exportExcludeColumns, exportFilename, sortedRows]);

  // ---------- Toolbar ----------
  const filterableColumns = columns.filter((column) => column.filterable !== false);

  // ---------- Loading skeleton -------------
  const renderSkeletonRows = () => {
    const rowCount = 5;
    const columnCount = Math.max(1, visibleColumns.length);
    return (
      <tbody>
        {Array.from({ length: rowCount }, (_, rowIndex) => (
          <tr key={rowIndex}>
            <td className={classNames(SIZE_CLASSES[size])}>
              <Skeleton variant="text" width="100%" />
            </td>
            {Array.from({ length: columnCount }, (_, colIndex) => (
              <td key={colIndex} className={classNames(SIZE_CLASSES[size])}>
                <Skeleton variant="text" width={`${60 + ((rowIndex * 7 + colIndex * 13) % 40)}%`} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  // ---------- Body ----------
  const renderBody = () => {
    if (loading) return renderSkeletonRows();

    if (pageRows.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={visibleColumns.length + 1}>
              <div className="p-6">
                {emptyState ?? (
                  <EmptyState
                    title="No results"
                    description="Try adjusting your filters or search query."
                  />
                )}
              </div>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {pageRows.map((row, rowIndex) => {
          const rowId = resolveRowId(row);
          const isSelected = selectedSet.has(rowId);

          return (
            <tr
              key={rowId}
              aria-selected={isSelected || undefined}
              className={classNames(
                'transition-colors',
                isSelected && 'bg-blue-50 dark:bg-blue-950/40',
              )}
            >
              <td className={classNames(SIZE_CLASSES[size])}>
                <Checkbox
                  checked={isSelected}
                  onChange={() => toggleRowSelection(rowId)}
                  aria-label={`Select ${label} row ${rowIndex + 1}`}
                />
              </td>
              {visibleColumns.map((column) => {
                const value = getCellValue(row, column);
                return (
                  <td
                    key={column.key}
                    style={column.width ? { minWidth: column.width } : undefined}
                    className={classNames(
                      'border-b border-slate-200 dark:border-slate-800',
                      SIZE_CLASSES[size],
                      ALIGNMENT_CLASSES[column.align ?? 'start'],
                      column.nowrap && 'whitespace-nowrap',
                      column.cellClassName,
                    )}
                  >
                    {value as React.ReactNode}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  // ---------- Render ----------
  return (
    <div
      className={classNames(
        'overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col gap-2 rounded-t-xl border-b border-slate-200 p-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor={`${baseId}-search`}>
            Search {label}
          </label>
          <input
            id={`${baseId}-search`}
            type="search"
            value={search}
            disabled={disabled || serverSide}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          />

          {filterableColumns.map((column) => (
            <input
              key={column.key}
              id={`${baseId}-filter-${column.key}`}
              type="search"
              value={effectiveFilters[column.key] ?? ''}
              disabled={disabled || serverSide}
              onChange={(event) => handleFilterChange(column.key, event.target.value)}
              placeholder={`Filter ${String(column.header)}`}
              aria-label={`Filter by ${String(column.header)}`}
              className="h-9 w-full max-w-[10rem] rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          ))}

          {(Object.keys(effectiveFilters).length > 0 || search) && (
            <button
              type="button"
              onClick={clearFilters}
              className="h-9 rounded-lg px-2 text-sm font-medium text-blue-600 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-blue-400 dark:hover:bg-slate-800"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {enableExport && (
            <button
              type="button"
              onClick={handleExport}
              disabled={disabled || totalCount === 0}
              className="h-9 rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Export CSV
            </button>
          )}

          {visibleColumnOptions && visibleColumnOptions.length > 0 && (
            <div ref={visibilityMenuRef} className="relative">
              <button
                type="button"
                aria-expanded={visibilityMenuOpen}
                aria-haspopup="menu"
                onClick={() => setVisibilityMenuOpen((open) => !open)}
                className="h-9 rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Columns
              </button>
              {visibilityMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-30 mt-1 w-48 rounded-lg border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
                >
                  {visibleKeyOptions.map((option) => {
                    const isVisible = visibleKeys.includes(option.key);
                    return (
                      <label
                        key={option.key}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Checkbox
                          checked={isVisible}
                          onChange={() => toggleColumnVisibility(option.key)}
                          aria-label={`Toggle column ${option.label}`}
                        />
                        <span className="truncate text-slate-700 dark:text-slate-300">
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {caption && (
        <div
          id={captionId}
          className="border-b border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300"
        >
          {caption}
        </div>
      )}

      <div className={responsive ? 'overflow-x-auto' : ''}>
        <table
          aria-labelledby={caption ? captionId : undefined}
          aria-label={caption ? undefined : label}
          className={classNames(
            'w-full border-separate border-spacing-0',
            stickyHeader && '[&_thead_th]:sticky [&_thead_th]:top-0',
            striped &&
              '[&_tbody_tr:nth-child(odd)]:bg-slate-50 dark:[&_tbody_tr:nth-child(odd)]:bg-slate-900/50',
            hover && '[&_tbody_tr]:hover:bg-slate-100 dark:[&_tbody_tr]:hover:bg-slate-800/50',
          )}
          style={maxHeight !== undefined ? { maxHeight: toCssLength(maxHeight) } : undefined}
        >
          <thead>
            <tr className="[&_th]:border-b [&_th]:border-slate-200 [&_th]:bg-slate-50 dark:[&_th]:border-slate-800 dark:[&_th]:bg-slate-900">
              <th scope="col" className="w-10 px-4 py-2.5">
                <Checkbox
                  checked={allVisibleSelected}
                  indeterminate={!allVisibleSelected && someVisibleSelected}
                  onChange={toggleAllRows}
                  disabled={disabled || visibleRowIds.length === 0}
                  aria-label={`Select all ${selectionLabel}`}
                />
              </th>
              {visibleColumns.map((column) => {
                const sort = effectiveSortState.find((s) => s.columnId === column.key);
                const sortable = column.sortable !== false;

                return (
                  <th
                    key={column.key}
                    scope="col"
                    style={column.width ? { minWidth: column.width } : undefined}
                    className={classNames(
                      'border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400',
                      ALIGNMENT_CLASSES[column.align ?? 'start'],
                      column.headerClassName,
                    )}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        aria-label={column.sortLabel ?? `Sort by ${String(column.header)}`}
                        onClick={() => handleToggleSort(column)}
                        className={classNames(
                          'inline-flex items-center gap-1 font-semibold uppercase tracking-wider hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed dark:hover:text-slate-200',
                          sort && 'text-blue-600 dark:text-blue-400',
                        )}
                      >
                        {column.header}
                        <span aria-hidden="true" className="text-[10px]">
                          {sort ? SORT_INDICATORS[sort.direction] : '↕'}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          {renderBody()}
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
          {loading ? 'Loading…' : `${totalCount} ${selectionLabel}`}
        </p>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="sr-only">Rows per page</span>
            <select
              value={effectivePageSize}
              onChange={(event) => changePageSize(Number(event.target.value))}
              disabled={disabled}
              className="h-8 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
          </label>

          {!serverSide && (
            <Pagination
              page={safePage}
              pageCount={safePageCount}
              onPageChange={goToPage}
              disabled={disabled}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** Generic comparator used by client-side sorting. */
function compareValues(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  const aStr = String(a).toLowerCase();
  const bStr = String(b).toLowerCase();
  if (aStr < bStr) return -1;
  if (aStr > bStr) return 1;
  return 0;
}

function toCssLength(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export default DataTable;
