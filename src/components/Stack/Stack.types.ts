import type { HTMLAttributes, ReactNode } from 'react';

/** Main axis direction for the flex layout. */
export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/** Spacing token matching the Tailwind spacing scale. */
export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Cross/justify alignment helpers. */
export type StackAlignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Props for the Stack component.
 */
export interface StackProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Flex direction. Defaults to `'column'`. */
  direction?: StackDirection;
  /** Gap between children. Defaults to `'md'`. */
  spacing?: StackSpacing;
  /** Cross-axis alignment. Defaults to `'stretch'`. */
  align?: StackAlignment;
  /** Main-axis alignment. */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Wraps children onto multiple lines. */
  wrap?: boolean;
  /** Children. */
  children: ReactNode;
  /** Additional CSS classes on the root. */
  className?: string;
}
