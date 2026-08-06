import type { BaseProps } from '../../types/common';

/** Available spinner sizes, mirroring the design-system scale. */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Color variants for the spinner. */
export type SpinnerVariant = 'primary' | 'secondary' | 'light' | 'dark';

/**
 * Props for the Spinner component.
 */
export interface SpinnerProps extends BaseProps {
  /** Size of the spinner. Defaults to `'md'`. */
  size?: SpinnerSize;
  /** Color variant. Defaults to `'primary'`. */
  variant?: SpinnerVariant;
  /** Accessible label announced by screen readers. Defaults to `'Loading'`. */
  label?: string;
  /**
   * When `true`, the spinner is purely decorative and is removed from the
   * accessibility tree. Use this when embedding a spinner inside another
   * element that already communicates state (e.g. a loading button).
   */
  decorative?: boolean;
}
