import { useCallback, useMemo, useRef, useState } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortState<ColumnId extends string = string> {
  columnId: ColumnId;
  direction: SortDirection;
}

/**
 * Generic sorting state for data tables.
 *
 * Maintains internal (uncontrolled) sort state and reports every change via
 * `onChange`, so consumers can either ignore events (uncontrolled) or
 * re-render with a controlled value (controlled).
 *
 * Supports single-column sorting with cycling direction
 * (`asc` → `desc` → none) and multi-column sorting.
 *
 * @example
 * const { sortState, toggleSort } = useSorting<string>();
 * <button onClick={() => toggleSort('name')}>Name</button>
 */
export function useSorting<ColumnId extends string = string>({
  multiSort = false,
  initialSort,
  onChange,
}: {
  multiSort?: boolean;
  initialSort?: SortState<ColumnId> | SortState<ColumnId>[];
  /** Invoked with the next sort state after every toggle/clear/set. */
  onChange?: (next: SortState<ColumnId>[]) => void;
} = {}) {
  const [sortState, setSortState] = useState<SortState<ColumnId>[]>(
    initialSort ? (Array.isArray(initialSort) ? initialSort : [initialSort]) : [],
  );

  // Keep the latest onChange in a ref so callers don't need useCallback.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Latest state mirror so the toggle callback can compute the next value
  // outside the state updater (side-effect-free reducer).
  const stateRef = useRef(sortState);
  stateRef.current = sortState;

  const toggleSort = useCallback(
    (columnId: ColumnId) => {
      const prev = stateRef.current;
      const existingIndex = prev.findIndex((s) => s.columnId === columnId);
      const existing = existingIndex >= 0 ? prev[existingIndex] : undefined;

      const nextDirection: SortDirection | null = !existing
        ? 'asc'
        : existing.direction === 'asc'
          ? 'desc'
          : null;

      let next: SortState<ColumnId>[];
      if (nextDirection === null) {
        // Cycle back to "no sort" for this column.
        next = prev.filter((s) => s.columnId !== columnId);
      } else if (multiSort) {
        const nextSorts = [...prev];
        if (existingIndex >= 0) {
          nextSorts[existingIndex] = { columnId, direction: nextDirection };
        } else {
          nextSorts.push({ columnId, direction: nextDirection });
        }
        next = nextSorts;
      } else {
        next = [{ columnId, direction: nextDirection }];
      }

      setSortState(next);
      onChangeRef.current?.(next);
    },
    [multiSort],
  );

  const clearSort = useCallback(() => {
    setSortState([]);
    onChangeRef.current?.([]);
  }, []);

  const setSorts = useCallback((sorts: SortState<ColumnId>[]) => {
    setSortState(sorts);
    onChangeRef.current?.(sorts);
  }, []);

  /**
   * Sorts a copy of `rows` using the provided extractor and current state.
   * The extractor must be memoized by the caller to keep this stable.
   */
  const sortRows = useCallback(
    <Row>(rows: Row[], extractor: (row: Row, columnId: ColumnId) => unknown): Row[] => {
      const state = stateRef.current;
      if (state.length === 0) return rows;

      const sorted = [...rows];
      sorted.sort((a, b) => {
        for (const sort of state) {
          const av = extractor(a, sort.columnId);
          const bv = extractor(b, sort.columnId);
          const result = compareValues(av, bv);
          if (result !== 0) {
            return sort.direction === 'asc' ? result : -result;
          }
        }
        return 0;
      });
      return sorted;
    },
    [],
  );

  return useMemo(
    () => ({
      sortState,
      toggleSort,
      clearSort,
      setSorts,
      sortRows,
    }),
    [sortState, toggleSort, clearSort, setSorts, sortRows],
  );
}

/** Lexicographic + numeric comparison used by `sortRows`. */
function compareValues(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  const aStr = String(a).toLowerCase();
  const bStr = String(b).toLowerCase();
  if (aStr < bStr) return -1;
  if (aStr > bStr) return 1;
  return 0;
}

export default useSorting;
