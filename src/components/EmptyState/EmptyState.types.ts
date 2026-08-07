import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Props for the EmptyState component.
 */
export interface EmptyStateProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'title'
> {
  /** Optional illustration or icon shown above the title. */
  illustration?: ReactNode;
  /** Title text. */
  title: ReactNode;
  /** Optional descriptive text. */
  description?: ReactNode;
  /** Optional primary action. */
  action?: ReactNode;
  /** Optional secondary action. */
  secondaryAction?: ReactNode;
  /** Layout orientation. Defaults to `'vertical'`. */
  layout?: 'vertical' | 'horizontal';
  /** Additional CSS classes on the root. */
  className?: string;
}
