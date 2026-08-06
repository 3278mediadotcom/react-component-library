import { useMemo } from 'react';
import { classNames } from '../../utils/classNames';
import { useControllableState } from '../../hooks/useControllableState';
import type { PaginationProps } from './Pagination.types';

type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

/** Builds the collapsed page list: boundaries, siblings, and ellipses. */
function buildPageItems(
  pageCount: number,
  currentPage: number,
  siblingCount: number,
  boundaryCount: number,
): PageItem[] {
  // Merge the three page ranges (boundaries, visible window) and sort.
  // Overlaps are removed so small page counts never duplicate numbers.
  const pages = new Set<number>();
  for (let i = 1; i <= Math.min(boundaryCount, pageCount); i++) pages.add(i);
  for (let i = Math.max(pageCount - boundaryCount + 1, 1); i <= pageCount; i++) pages.add(i);
  for (
    let i = Math.max(1, currentPage - siblingCount);
    i <= Math.min(pageCount, currentPage + siblingCount);
    i++
  ) {
    pages.add(i);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const items: PageItem[] = [];

  let previous = 0;
  for (const page of sorted) {
    if (page - previous > 1) {
      // Single-page gaps are filled with the number; larger gaps collapse.
      const gapSize = page - previous - 1;
      if (gapSize === 1) {
        items.push(previous + 1);
      } else {
        const gapStartsBeforeWindow = previous < currentPage - siblingCount;
        items.push(gapStartsBeforeWindow ? 'ellipsis-start' : 'ellipsis-end');
      }
    }
    items.push(page);
    previous = page;
  }

  return items;
}

const pageButtonClasses =
  'inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';

/**
 * Pagination — collapses large page counts with ellipses.
 *
 * Example: `1 2 3 … 14 15` when the current page is in the middle.
 */
export function Pagination({
  pageCount,
  page,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  disabled = false,
  label = 'Pagination',
  className,
  ...rest
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useControllableState<number>({
    value: page,
    defaultValue: Math.min(defaultPage, pageCount),
    onChange: (next) => onPageChange?.(next),
  });

  const safePage = Math.min(Math.max(currentPage, 1), pageCount);

  const items = useMemo(
    () => buildPageItems(pageCount, safePage, siblingCount, boundaryCount),
    [pageCount, safePage, siblingCount, boundaryCount],
  );

  const goTo = (target: number) => {
    if (disabled || target < 1 || target > pageCount || target === safePage) return;
    setCurrentPage(target);
  };

  const previousDisabled = disabled || safePage <= 1;
  const nextDisabled = disabled || safePage >= pageCount;

  return (
    <nav aria-label={label} className={classNames('flex items-center gap-1', className)} {...rest}>
      <button
        type="button"
        disabled={previousDisabled}
        aria-label="Previous page"
        onClick={() => goTo(safePage - 1)}
        className={classNames(
          pageButtonClasses,
          'text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800',
        )}
      >
        ‹
      </button>

      {items.map((item, index) => {
        if (item === 'ellipsis-start' || item === 'ellipsis-end') {
          return (
            <span
              key={item}
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center text-sm text-slate-400 dark:text-slate-500"
            >
              …
            </span>
          );
        }

        const isCurrent = item === safePage;
        return (
          <button
            key={`${item}-${index}`}
            type="button"
            disabled={disabled}
            aria-current={isCurrent ? 'page' : undefined}
            aria-label={isCurrent ? `Page ${item}` : `Go to page ${item}`}
            onClick={() => goTo(item)}
            className={classNames(
              pageButtonClasses,
              isCurrent
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
              disabled && 'opacity-50',
            )}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        disabled={nextDisabled}
        aria-label="Next page"
        onClick={() => goTo(safePage + 1)}
        className={classNames(
          pageButtonClasses,
          'text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800',
        )}
      >
        ›
      </button>

      {/* First/Last quick navigation for large ranges */}
      {pageCount > 3 && (
        <span className="ml-2 flex items-center gap-1">
          <button
            type="button"
            disabled={disabled || safePage === 1}
            aria-label="First page"
            onClick={() => goTo(1)}
            className={classNames(
              pageButtonClasses,
              'text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800',
            )}
          >
            «
          </button>
          <button
            type="button"
            disabled={disabled || safePage === pageCount}
            aria-label="Last page"
            onClick={() => goTo(pageCount)}
            className={classNames(
              pageButtonClasses,
              'text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800',
            )}
          >
            »
          </button>
        </span>
      )}
    </nav>
  );
}

export default Pagination;
