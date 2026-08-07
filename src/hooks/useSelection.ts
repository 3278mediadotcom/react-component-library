import { useCallback, useMemo, useState } from 'react';

/**
 * Row-selection state for data tables.
 *
 * Tracks a set of selected row ids, exposes toggle/select-all helpers, and
 * reports whether the selection is "all" or "some" — the two states a header
 * checkbox needs to render.
 *
 * @example
 * const selection = useSelection<string>();
 * selection.toggleRow('id-1');
 * selection.isSelected('id-1') // true
 */
export function useSelection<Id extends string | number = string>({
  initialSelected = [],
  keyOf,
}: {
  /** Rows selected on first render (uncontrolled). */
  initialSelected?: Id[];
  /** Extracts the id from a row object. Used by `selectRows`/`toggleAll`.
   *  Defaults to `(row) => row.id`. */
  keyOf?: (row: unknown) => Id;
} = {}) {
  const [selected, setSelected] = useState<Set<Id>>(new Set(initialSelected));

  const toggleRow = useCallback((id: Id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectRow = useCallback((id: Id) => {
    setSelected((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const deselectRow = useCallback((id: Id) => {
    setSelected((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSelected(new Set()), []);

  const defaultExtract = useCallback((row: unknown): Id => {
    return ((row as { id?: Id }).id ?? '') as Id;
  }, []);

  const selectAll = useCallback(
    (rows: unknown[]) => {
      const extract = keyOf ?? defaultExtract;
      setSelected(new Set(rows.map((row) => extract(row))));
    },
    [keyOf, defaultExtract],
  );

  const toggleAll = useCallback(
    (rows: unknown[]) => {
      const extract = keyOf ?? defaultExtract;
      setSelected((prev) => {
        const rowIds = rows.map((row) => extract(row));
        const allSelected = rowIds.length > 0 && rowIds.every((id) => prev.has(id));
        if (allSelected) {
          const next = new Set(prev);
          rowIds.forEach((id) => next.delete(id));
          return next;
        }
        const next = new Set(prev);
        rowIds.forEach((id) => next.add(id));
        return next;
      });
    },
    [keyOf, defaultExtract],
  );

  const isSelected = useCallback((id: Id) => selected.has(id), [selected]);

  const isAllSelected = useCallback(
    (rows: unknown[]) => {
      const extract = keyOf ?? defaultExtract;
      return rows.length > 0 && rows.every((row) => selected.has(extract(row)));
    },
    [selected, keyOf, defaultExtract],
  );

  const isSomeSelected = useCallback(
    (rows: unknown[]) => {
      const extract = keyOf ?? defaultExtract;
      return rows.some((row) => selected.has(extract(row)));
    },
    [selected, keyOf, defaultExtract],
  );

  const selectedCount = selected.size;

  return useMemo(
    () => ({
      selected,
      selectedCount,
      toggleRow,
      selectRow,
      deselectRow,
      clear,
      selectAll,
      toggleAll,
      isSelected,
      isAllSelected,
      isSomeSelected,
    }),
    [
      selected,
      selectedCount,
      toggleRow,
      selectRow,
      deselectRow,
      clear,
      selectAll,
      toggleAll,
      isSelected,
      isAllSelected,
      isSomeSelected,
    ],
  );
}

export default useSelection;
