import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

/** Spacing token matching the Tailwind spacing scale. */
export type GridSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Responsive column configuration. Keys are Tailwind breakpoints (all are
 * optional); each value sets the number of columns for that breakpoint and
 * up.
 */
export interface GridBreakpoints {
  /** ≥ 640px */
  sm?: number;
  /** ≥ 768px */
  md?: number;
  /** ≥ 1024px */
  lg?: number;
  /** ≥ 1280px */
  xl?: number;
  /** ≥ 1536px */
  '2xl'?: number;
}

/**
 * Props for the Grid component.
 */
export interface GridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Number of columns. When a number, applies a fixed template; can also be
   *  a raw CSS grid-template-columns value for fine control. Defaults to `1`. */
  columns?: number | string;
  /** Gap between tracks. Defaults to `'md'`. */
  gap?: GridSpacing;
  /** Responsive column overrides per breakpoint. */
  breakpoints?: GridBreakpoints;
  /** Auto-fit: stretches tracks to fill the container. */
  autoFit?: boolean;
  /** Auto-fill: repeats tracks but leaves empty space on the right. */
  autoFill?: boolean;
  /** Minimum track width used by auto-fit/auto-fill. Defaults to `'250px'`. */
  minColumnWidth?: string;
  /** Children. */
  children: ReactNode;
  /** Additional CSS classes on the root. */
  className?: string;
  /** Miscellaneous inline styles merged onto the root. */
  style?: CSSProperties;
}
