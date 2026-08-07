import { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import type { StackAlignment, StackDirection, StackProps, StackSpacing } from './Stack.types';

const DIRECTION_CLASSES: Record<StackDirection, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
};

const SPACING_CLASSES: Record<StackSpacing, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

const ALIGN_CLASSES: Record<StackAlignment, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const JUSTIFY_CLASSES: Record<NonNullable<StackProps['justify']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

/**
 * Stack — a flexbox layout primitive.
 *
 * Consistent spacing and alignment for vertical or horizontal arrangements,
 * backed by standard flexbox utilities so compositions remain predictable.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    direction = 'column',
    spacing = 'md',
    align = 'stretch',
    justify,
    wrap = false,
    children,
    className,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames(
        'flex',
        DIRECTION_CLASSES[direction],
        SPACING_CLASSES[spacing],
        ALIGN_CLASSES[align],
        justify && JUSTIFY_CLASSES[justify],
        wrap && 'flex-wrap',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Stack;
