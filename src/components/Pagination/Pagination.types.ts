import type { HTMLAttributes } from 'react';

/**
 * Props for the Pagination component.
 */
export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'onChange' | 'className'
> {
  /** Total number of pages. */
  pageCount: number;
  /** Current page (1-based). Supports controlled usage. */
  page?: number;
  /** Initial page for uncontrolled usage. Defaults to 1. */
  defaultPage?: number;
  /** Called when the active page changes. */
  onPageChange?: (page: number) => void;
  /** Number of visible siblings around the current page. Defaults to 1. */
  siblingCount?: number;
  /** Number of visible pages at the start and end. Defaults to 1. */
  boundaryCount?: number;
  /** Disables all interactions. */
  disabled?: boolean;
  /** Accessible label for the navigation landmark. Defaults to `'Pagination'`. */
  label?: string;
  /** Additional CSS classes on the wrapper. */
  className?: string;
}
