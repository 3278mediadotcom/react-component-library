import { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import type { ProgressProps, ProgressSize } from './Progress.types';

const COLOR_CLASSES = {
  primary: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-amber-500',
  danger: 'bg-red-600',
} as const;

const LINEAR_TRACK_CLASSES =
  'h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700';

const CIRCULAR_SIZES: Record<ProgressSize, { size: number; stroke: number; className: string }> = {
  sm: { size: 40, stroke: 4, className: 'h-10 w-10' },
  md: { size: 56, stroke: 5, className: 'h-14 w-14' },
  lg: { size: 72, stroke: 6, className: 'h-[72px] w-[72px]' },
};

/**
 * Progress — determinate or indeterminate progress indicator.
 *
 * Implements the WAI-ARIA progressbar pattern: `role="progressbar"` with
 * `aria-valuenow` (determinate only). Linear and circular variants are
 * available; `indeterminate` renders an animated bar/ring arc.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    variant = 'linear',
    value,
    indeterminate = false,
    label,
    showValue = false,
    color = 'primary',
    size = 'md',
    thickness,
    className,
    ...rest
  },
  ref,
) {
  const isDeterminate = !indeterminate && typeof value === 'number';
  const safeValue = isDeterminate ? Math.min(Math.max(value as number, 0), 100) : 0;

  const sharedAria = {
    role: 'progressbar',
    'aria-label': label,
    'aria-valuemin': isDeterminate ? 0 : undefined,
    'aria-valuemax': isDeterminate ? 100 : undefined,
    'aria-valuenow': isDeterminate ? safeValue : undefined,
    'aria-valuetext': isDeterminate ? `${safeValue}%` : undefined,
  };

  if (variant === 'circular') {
    const config = CIRCULAR_SIZES[size];
    const strokeWidth = thickness ?? config.stroke;
    const radius = (config.size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = isDeterminate ? circumference * (1 - safeValue / 100) : 0;

    return (
      <div
        ref={ref}
        className={classNames('relative inline-flex items-center justify-center', className)}
        {...rest}
        {...sharedAria}
      >
        <svg
          viewBox={`0 0 ${config.size} ${config.size}`}
          className={classNames(config.className, 'text-slate-200 dark:text-slate-700')}
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke="currentColor"
          />
          {/* Progress arc (determinate) or indeterminate spinning arc */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray={
              indeterminate ? `${circumference * 0.3} ${circumference}` : circumference
            }
            strokeDashoffset={indeterminate ? circumference * 0.15 : dashOffset}
            transform={`rotate(-90 ${config.size / 2} ${config.size / 2})`}
            className={classNames(
              COLOR_CLASSES[color],
              indeterminate && 'animate-spin origin-[50%_50%]',
            )}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={classNames('flex w-full items-center gap-3', className)}
      {...rest}
      {...sharedAria}
    >
      <div className={classNames(LINEAR_TRACK_CLASSES, indeterminate && 'overflow-hidden')}>
        <div
          className={classNames(
            'h-full rounded-full transition-all duration-300',
            COLOR_CLASSES[color],
            indeterminate && 'animate-progress-indeterminate w-2/5',
          )}
          style={isDeterminate ? { width: `${safeValue}%` } : undefined}
        />
      </div>
      {showValue && isDeterminate && (
        <span
          className="text-sm tabular-nums text-slate-600 dark:text-slate-300"
          aria-hidden="true"
        >
          {safeValue}%
        </span>
      )}
    </div>
  );
});

export default Progress;
