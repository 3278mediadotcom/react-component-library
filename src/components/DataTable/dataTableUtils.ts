import type { DataTableColumn } from './DataTable.types';

/**
 * Resolves the display value for a row/column pair.
 *
 * Falls back to `String(row[column.key])` when no renderer is supplied, so
 * the filter and CSV export paths stay consistent with the visible cells.
 */
export function getCellValue<Row>(row: Row, column: DataTableColumn<Row>): unknown {
  if (column.render) {
    return column.render(row);
  }
  return (row as Record<string, unknown>)[column.key];
}

/**
 * Applies per-column text filters (ANDed) and a global search term.
 *
 * Values are flattened to a lowercase string before matching, so renderers
 * that return React nodes degrade gracefully.
 */
export function filterRows<Row>(
  rows: Row[],
  columns: DataTableColumn<Row>[],
  filters: Record<string, string>,
  search: string,
): Row[] {
  const globalQuery = search.trim().toLowerCase();
  const activeColumnFilters = Object.entries(filters).filter(([, value]) => value.trim());

  if (globalQuery === '' && activeColumnFilters.length === 0) return rows;

  return rows.filter((row) => {
    // Global search scans every filterable column.
    if (globalQuery !== '') {
      const globalHit = columns.some((column) => {
        const value = getCellValue(row, column);
        return flattenForSearch(value).includes(globalQuery);
      });
      if (!globalHit) return false;
    }

    // Per-column filters must all match.
    for (const [key, query] of activeColumnFilters) {
      const column = columns.find((c) => c.key === key);
      if (!column) continue;
      const value = getCellValue(row, column);
      if (!flattenForSearch(value).includes(query.trim().toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

/** Flattens any cell value to a searchable lowercase string. */
export function flattenForSearch(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.toLowerCase();
  if (typeof value === 'number' || typeof value === 'boolean') return String(value).toLowerCase();
  // React nodes (e.g. custom renderers) — try to extract the text.
  try {
    const node = value as { props?: { children?: unknown } };
    if (node.props?.children !== undefined) {
      return flattenForSearch(node.props.children);
    }
  } catch {
    // fall through
  }
  return '';
}

/** Escapes a cell value for a CSV file. */
function escapeCsvCell(value: unknown): string {
  const text = String(value ?? '');
  const needsQuoting = /[",\n\r]/.test(text);
  return needsQuoting ? `"${text.replace(/"/g, '""')}"` : text;
}

/**
 * Builds a CSV string from the visible (or exported) columns and rows.
 */
export function toCsv<Row>(
  columns: DataTableColumn<Row>[],
  rows: Row[],
  excludeColumns: string[] = [],
): string {
  const exportColumns = columns.filter((column) => !excludeColumns.includes(column.key));

  const header = exportColumns.map((column) => escapeCsvCell(column.key)).join(',');
  const body = rows.map((row) =>
    exportColumns.map((column) => escapeCsvCell(getCellValue(row, column))).join(','),
  );

  return [header, ...body].join('\n');
}

/**
 * Triggers a browser download of a CSV file.
 */
export function downloadCsv(csv: string, filename = 'data'): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
