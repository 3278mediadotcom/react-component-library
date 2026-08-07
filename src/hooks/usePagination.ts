import { useCallback, useMemo, useState } from 'react';

/**
 * Pagination state for data tables and list views.
 *
 * Tracks the current page and page size, and exposes the row slice for the
 * current page. Works with the existing `Pagination` component via
 * `page`, `pageCount`, and `onPageChange`.
 *
 * @example
 * const pagination = usePagination({ totalItems: 100, pageSize: 10 });
 * // pagination.pageRows(rows) -> rows[0..10)
 */
export function usePagination({
  totalItems,
  initialPage = 1,
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 50],
}: {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));

  const safePage = Math.min(Math.max(page, 1), pageCount);

  const goToPage = useCallback(
    (next: number) => {
      setPage(Math.min(Math.max(next, 1), pageCount));
    },
    [pageCount],
  );

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, pageCount));
  }, [pageCount]);

  const previousPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const changePageSize = useCallback((size: number) => {
    setPageSize(size);
    // Reset to the first page so the view doesn't land past the end.
    setPage(1);
  }, []);

  /** Slices a full row list down to the current page. */
  const pageRows = useCallback(
    <Row>(rows: Row[]): Row[] => {
      const start = (safePage - 1) * pageSize;
      return rows.slice(start, start + pageSize);
    },
    [safePage, pageSize],
  );

  return useMemo(
    () => ({
      page: safePage,
      pageSize,
      pageCount,
      pageSizeOptions,
      goToPage,
      nextPage,
      previousPage,
      changePageSize,
      pageRows,
    }),
    [
      safePage,
      pageSize,
      pageCount,
      pageSizeOptions,
      goToPage,
      nextPage,
      previousPage,
      changePageSize,
      pageRows,
    ],
  );
}

export default usePagination;
