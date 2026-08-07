import { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import type { EmptyStateProps } from './EmptyState.types';

/**
 * EmptyState — a neutral placeholder for empty data.
 *
 * Composes an illustration/icon, title, description, and optional actions.
 * Useful in DataTables, list views, and dashboards when a query returns no
 * results.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  {
    illustration,
    title,
    description,
    action,
    secondaryAction,
    layout = 'vertical',
    className,
    ...rest
  },
  ref,
) {
  const isVertical = layout === 'vertical';

  return (
    <div
      ref={ref}
      className={classNames(
        'flex items-center rounded-xl',
        isVertical ? 'flex-col px-6 py-12 text-center' : 'flex-row gap-6 p-6 text-left',
        className,
      )}
      {...rest}
    >
      {illustration && (
        <div
          aria-hidden="true"
          className={classNames(
            'flex shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500',
            isVertical
              ? 'mb-4 h-16 w-16 [&>svg]:h-8 [&>svg]:w-8'
              : 'h-14 w-14 [&>svg]:h-7 [&>svg]:w-7',
          )}
        >
          {illustration}
        </div>
      )}

      <div className={classNames(isVertical ? 'flex flex-col items-center' : 'flex-1')}>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        {description && (
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
        )}
        {(action || secondaryAction) && (
          <div
            className={classNames(
              'flex flex-wrap items-center gap-2',
              isVertical ? 'mt-4 justify-center' : 'mt-3',
            )}
          >
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    </div>
  );
});

export default EmptyState;
