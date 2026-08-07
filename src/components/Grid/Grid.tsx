import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import { classNames } from '../../utils/classNames';
import type { GridProps, GridSpacing } from './Grid.types';

const GAP_CLASSES: Record<GridSpacing, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

const NUMERIC_TEMPLATE_CLASSES = [
  'grid-cols-[repeat(var(--grid-cols,1),minmax(0,1fr))]',
  'sm:grid-cols-[repeat(var(--grid-cols-sm,var(--grid-cols)),minmax(0,1fr))]',
  'md:grid-cols-[repeat(var(--grid-cols-md,var(--grid-cols)),minmax(0,1fr))]',
  'lg:grid-cols-[repeat(var(--grid-cols-lg,var(--grid-cols)),minmax(0,1fr))]',
  'xl:grid-cols-[repeat(var(--grid-cols-xl,var(--grid-cols)),minmax(0,1fr))]',
  '2xl:grid-cols-[repeat(var(--grid-cols-2xl,var(--grid-cols)),minmax(0,1fr))]',
];

/**
 * Grid — a CSS grid layout primitive.
 *
 * Column counts and responsive breakpoints are wired through CSS custom
 * properties plus arbitrary-value utilities, so Tailwind can statically
 * generate every class while consumers get dynamic column values at runtime.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    columns = 1,
    gap = 'md',
    breakpoints,
    autoFit = false,
    autoFill = false,
    minColumnWidth = '250px',
    children,
    className,
    style,
    ...rest
  },
  ref,
) {
  const isNumeric = !autoFit && !autoFill && typeof columns === 'number';
  const gridStyle: CSSProperties = { ...style };

  if (autoFit || autoFill) {
    const mode = autoFit ? 'auto-fit' : 'auto-fill';
    gridStyle.gridTemplateColumns = `repeat(${mode}, minmax(${minColumnWidth}, 1fr))`;
  } else if (typeof columns === 'string') {
    gridStyle.gridTemplateColumns = columns;
  } else if (columns > 12) {
    // Tailwind's template classes only cover 1–12; larger counts inline.
    gridStyle.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  }

  const cssVars: Record<string, string | undefined> = {
    '--grid-cols': isNumeric ? String(columns) : undefined,
    '--grid-cols-sm': breakpoints?.sm !== undefined ? String(breakpoints.sm) : undefined,
    '--grid-cols-md': breakpoints?.md !== undefined ? String(breakpoints.md) : undefined,
    '--grid-cols-lg': breakpoints?.lg !== undefined ? String(breakpoints.lg) : undefined,
    '--grid-cols-xl': breakpoints?.xl !== undefined ? String(breakpoints.xl) : undefined,
    '--grid-cols-2xl': breakpoints?.['2xl'] !== undefined ? String(breakpoints['2xl']) : undefined,
  };

  return (
    <div
      ref={ref}
      style={{ ...cssVars, ...gridStyle } as CSSProperties}
      className={classNames(
        'grid',
        isNumeric && NUMERIC_TEMPLATE_CLASSES,
        GAP_CLASSES[gap],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Grid;
