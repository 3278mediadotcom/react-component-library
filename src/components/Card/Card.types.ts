import type { ReactNode } from 'react';
import type { BaseProps } from '../../types/common';

/** Visual variants for the card surface. */
export type CardVariant = 'default' | 'outlined' | 'elevated';

/** Padding options for the card body. */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Props for the Card component.
 */
export interface CardProps extends BaseProps {
  /** Card content. */
  children: ReactNode;
  /** Visual variant. Defaults to `'default'`. */
  variant?: CardVariant;
  /** Optional header content (title + optional actions). */
  title?: ReactNode;
  /** Optional subtitle rendered under the title. */
  subtitle?: ReactNode;
  /** Optional footer rendered at the bottom of the card. */
  footer?: ReactNode;
  /** Padding around the body. Defaults to `'md'`. */
  padding?: CardPadding;
  /** Adds hover elevation/translate feedback (use for interactive cards). */
  hoverable?: boolean;
}
