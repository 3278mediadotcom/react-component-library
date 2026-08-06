import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { classNames } from '../../utils/classNames';
import type { SpinnerProps, SpinnerSize, SpinnerVariant } from './Spinner.types';

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-10 w-10',
};

const TRACK_CLASSES: Record<SpinnerVariant, string> = {
  primary: 'stroke-blue-200',
  secondary: 'stroke-slate-200',
  light: 'stroke-white/30',
  dark: 'stroke-slate-300',
};

const BAR_CLASSES: Record<SpinnerVariant, string> = {
  primary: 'stroke-blue-600',
  secondary: 'stroke-slate-500',
  light: 'stroke-white',
  dark: 'stroke-slate-900',
};

/**
 * Spinner — an accessible indeterminate progress indicator.
 *
 * Rendered as an SVG with `role="status"` and `aria-live="polite"` so screen
 * readers announce the loading state. Set `decorative` when embedding it in an
 * element that already communicates progress (e.g. a loading button).
 */
export const Spinner = forwardRef<SVGSVGElement, SpinnerProps & HTMLAttributes<SVGSVGElement>>(
  function Spinner(
    { size = 'md', variant = 'primary', label = 'Loading', decorative = false, className, ...rest },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        className={classNames('animate-spin', SIZE_CLASSES[size], className)}
        role={decorative ? 'presentation' : 'status'}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : label}
        aria-live={decorative ? undefined : 'polite'}
        {...rest}
      >
        <circle className={TRACK_CLASSES[variant]} cx="12" cy="12" r="10" strokeWidth="4" />
        <path
          className={BAR_CLASSES[variant]}
          d="M12 2a10 10 0 0 1 10 10"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  },
);

export default Spinner;
