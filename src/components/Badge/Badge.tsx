import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { classNames } from '../../utils/classNames';
import type { BadgeProps, BadgeSize, BadgeVariant } from './Badge.types';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary:
    'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-400/30',
  secondary:
    'bg-slate-100 text-slate-700 ring-slate-600/20 dark:bg-slate-500/15 dark:text-slate-300 dark:ring-slate-400/30',
  success:
    'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/15 dark:text-green-300 dark:ring-green-400/30',
  warning:
    'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/30',
  danger:
    'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-400/30',
  info: 'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-400/30',
};

const DOT_CLASSES: Record<BadgeVariant, string> = {
  primary: 'bg-blue-500',
  secondary: 'bg-slate-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-sky-500',
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-0.5 text-sm gap-1.5',
  lg: 'px-3 py-1 text-sm gap-1.5',
};

/**
 * Badge — a compact label for statuses, counts, and categories.
 *
 * Rendered as a `<span>` with an inline-flex layout so it can safely contain
 * icons and dots alongside text.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps & HTMLAttributes<HTMLSpanElement>>(
  function Badge(
    {
      variant = 'primary',
      size = 'md',
      dot = false,
      pill = false,
      icon,
      children,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <span
        ref={ref}
        className={classNames(
          'inline-flex items-center font-medium ring-1 ring-inset',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          pill ? 'rounded-full' : 'rounded-md',
          className,
        )}
        {...rest}
      >
        {dot && (
          <span
            aria-hidden="true"
            className={classNames('h-1.5 w-1.5 rounded-full', DOT_CLASSES[variant])}
          />
        )}
        {icon && (
          <span className="inline-flex shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="leading-none">{children}</span>
      </span>
    );
  },
);

export default Badge;
