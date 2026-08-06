import type { ReactNode } from 'react';
import type { BaseProps } from '../../types/common';

/** Semantic tones for the badge. */
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/** Available badge sizes. */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Badge component.
 */
export interface BadgeProps extends BaseProps {
  /** Badge content. Accepts text or any React node (e.g. an icon). */
  children: ReactNode;
  /** Semantic color variant. Defaults to `'primary'`. */
  variant?: BadgeVariant;
  /** Size of the badge. Defaults to `'md'`. */
  size?: BadgeSize;
  /** Shows a leading status dot indicating live/active state. */
  dot?: boolean;
  /** Renders a fully rounded pill shape instead of the default rounded corners. */
  pill?: boolean;
  /** Optional icon rendered before the content. */
  icon?: ReactNode;
}
