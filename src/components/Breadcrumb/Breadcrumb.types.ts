import type { ReactNode } from 'react';

/** A single breadcrumb item. */
export interface BreadcrumbItem {
  /** Item label. */
  label: ReactNode;
  /** Optional destination href. */
  href?: string;
  /** Marks this item as the current page (last item). */
  current?: boolean;
}

/**
 * Props for the Breadcrumb component.
 */
export interface BreadcrumbProps {
  /** Breadcrumb items in order (first → current page). */
  items: BreadcrumbItem[];
  /** Accessible label for the navigation landmark. Defaults to `'Breadcrumb'`. */
  label?: string;
  /** Additional CSS classes on the nav wrapper. */
  className?: string;
}
