import type { HTMLAttributes } from 'react';

/** Shape variants for the skeleton. */
export type SkeletonVariant = 'text' | 'avatar' | 'button' | 'card' | 'image';

/** Animation style. */
export type SkeletonAnimation = 'pulse' | 'wave';

/**
 * Props for the Skeleton component.
 */
export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Shape variant. Defaults to `'text'`. */
  variant?: SkeletonVariant;
  /** Animation effect. Defaults to `'pulse'`. */
  animation?: SkeletonAnimation;
  /** Width. Accepts any CSS length or percentage. */
  width?: string | number;
  /** Height. Accepts any CSS length or percentage. */
  height?: string | number;
  /** Bordered corners hint. If unset, derived from `variant`. */
  rounded?: boolean;
  /** Hides the element from the accessibility tree. Defaults to `true`. */
  decorative?: boolean;
  /** Additional CSS classes on the root. */
  className?: string;
}
