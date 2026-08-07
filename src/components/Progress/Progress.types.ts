import type { HTMLAttributes } from 'react';

/** Visual presentation of the progress indicator. */
export type ProgressVariant = 'linear' | 'circular';

/** Size for the circular variant. */
export type ProgressSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Progress component.
 */
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Presentation mode. Defaults to `'linear'`. */
  variant?: ProgressVariant;
  /** Current value (0–100). Omit for an indeterminate animation. */
  value?: number;
  /** Sets `aria-busy` on the root for announced indeterminate loading. */
  indeterminate?: boolean;
  /** Accessible label describing what is loading. */
  label?: string;
  /** Shows the numeric percentage beside a linear bar. */
  showValue?: boolean;
  /** Color accent. Defaults to `'primary'`. */
  color?: 'primary' | 'success' | 'warning' | 'danger';
  /** Size for the circular variant. Defaults to `'md'`. */
  size?: ProgressSize;
  /** Thickness of the linear bar or circular ring. */
  thickness?: number;
  /** Additional CSS classes on the root. */
  className?: string;
}
