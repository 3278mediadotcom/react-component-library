import { classNames } from '../../utils/classNames';
import type { AlertProps, AlertVariant } from './Alert.types';

const VARIANT_ICON_CLASSES: Record<AlertVariant, string> = {
  info: 'text-sky-500',
  success: 'text-green-500',
  warning: 'text-amber-500',
  danger: 'text-red-500',
  neutral: 'text-slate-500',
};

const VARIANT_CONTAINER_CLASSES: Record<AlertVariant, string> = {
  info: 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100',
  success:
    'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
  warning:
    'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100',
  danger:
    'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
  neutral:
    'border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100',
};

function AlertIcon({ variant }: { variant: AlertVariant }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    className: classNames('h-5 w-5 shrink-0', VARIANT_ICON_CLASSES[variant]),
  } as const;

  switch (variant) {
    case 'success':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'warning':
      return (
        <svg {...common}>
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    case 'danger':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6M9 9l6 6" />
        </svg>
      );
    case 'info':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8h.01M12 12v4" />
        </svg>
      );
  }
}

/**
 * Alert — an inline message with a semantic tone and live-region semantics.
 *
 * - `danger`/`warning` announce immediately (`role="alert"`).
 * - `info`/`success`/`neutral` announce politely (`role="status"`).
 * - Supports a dismiss button for user-controlled removal.
 */
export function Alert({
  children,
  title,
  icon,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  // Assertive for urgent tones; polite for informational tones.
  const role: 'alert' | 'status' =
    variant === 'danger' || variant === 'warning' ? 'alert' : 'status';

  return (
    <div
      role={role}
      className={classNames(
        'flex w-full items-start gap-3 rounded-lg border p-4 text-sm',
        VARIANT_CONTAINER_CLASSES[variant],
        className,
      )}
    >
      <span className="mt-0.5 inline-flex shrink-0">{icon ?? <AlertIcon variant={variant} />}</span>
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={classNames(title && 'mt-1', 'opacity-90')}>{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss alert"
          onClick={onDismiss}
          className="mt-0.5 shrink-0 rounded p-0.5 text-current opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Alert;
