import { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import type { DividerProps, DividerVariant } from './Divider.types';

const VARIANT_CLASSES: Record<DividerVariant, string> = {
  solid: 'border-slate-200 dark:border-slate-800',
  dashed: 'border-dashed border-slate-300 dark:border-slate-700',
  dotted: 'border-dotted border-slate-300 dark:border-slate-700',
};

/**
 * Divider — a semantic horizontal or vertical separator.
 *
 * Renders a native `<hr role="separator">`. A horizontal divider can carry an
 * optional centered label.
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  {
    orientation = 'horizontal',
    variant = 'solid',
    children,
    label = 'Divider',
    className,
    ...rest
  },
  ref,
) {
  if (children) {
    return (
      <div className={classNames('flex w-full items-center gap-3', className)}>
        <span
          aria-hidden="true"
          className={classNames('h-px flex-1 border-t', VARIANT_CLASSES[variant])}
        />
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {children}
        </span>
        <span
          aria-hidden="true"
          className={classNames('h-px flex-1 border-t', VARIANT_CLASSES[variant])}
        />
      </div>
    );
  }

  return (
    <hr
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      aria-label={label}
      className={classNames(
        'border-t',
        VARIANT_CLASSES[variant],
        orientation === 'vertical' && 'h-full w-px shrink-0 border-l',
        orientation === 'horizontal' && 'w-full',
        className,
      )}
      {...rest}
    />
  );
});

export default Divider;
