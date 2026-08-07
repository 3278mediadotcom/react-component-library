import type { HTMLAttributes, ReactNode } from 'react';

/** Orientation of the divider. */
export type DividerOrientation = 'horizontal' | 'vertical';

/** Visual style of the divider line. */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Props for the Divider component.
 */
export interface DividerProps extends Omit<
  HTMLAttributes<HTMLHRElement>,
  'children' | 'className'
> {
  /** Orientation. Defaults to `'horizontal'`. */
  orientation?: DividerOrientation;
  /** Line style. Defaults to `'solid'`. */
  variant?: DividerVariant;
  /** Optional centered label rendered on a horizontal divider. */
  children?: ReactNode;
  /** Accessible label for screen readers. Defaults to `'Divider'`. */
  label?: string;
  /** Additional CSS classes on the root. */
  className?: string;
}
