import { forwardRef } from 'react';
import { classNames } from '../../utils/classNames';
import { Spinner } from '../Spinner';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800',
  secondary:
    'bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:active:bg-slate-500',
  outline:
    'border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100 active:bg-slate-200 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-700',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800',
  success:
    'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:active:bg-green-800',
};

const DISABLED_CLASSES =
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none';

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1.5',
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2',
  xl: 'h-12 px-6 text-base gap-2',
};

const SPINNER_SIZES: Record<ButtonSize, 'xs' | 'sm' | 'md'> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
  xl: 'md',
};

const ICON_CLASSES = 'shrink-0 [&>svg]:h-4 [&>svg]:w-4';

/**
 * Button — the primary action control.
 *
 * Supports variants, sizes, loading state, icons, and full-width layout.
 * Loading renders an inline decorative Spinner and sets `aria-busy`, while the
 * disabled state uses the native disabled attribute (removing the button from
 * the tab order).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    type = 'button',
    children,
    className,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={disabled || undefined}
      aria-busy={loading || undefined}
      className={classNames(
        'inline-flex select-none items-center justify-center rounded-lg font-semibold transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
        VARIANT_CLASSES[variant],
        DISABLED_CLASSES,
        SIZE_CLASSES[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Spinner
          size={SPINNER_SIZES[size]}
          variant={
            variant === 'outline' || variant === 'ghost' || variant === 'secondary'
              ? 'dark'
              : 'light'
          }
          decorative
        />
      ) : (
        leftIcon && (
          <span aria-hidden="true" className={classNames('inline-flex', ICON_CLASSES)}>
            {leftIcon}
          </span>
        )
      )}
      <span className={classNames(loading && 'opacity-70')}>{children}</span>
      {!loading && rightIcon && (
        <span aria-hidden="true" className={classNames('inline-flex', ICON_CLASSES)}>
          {rightIcon}
        </span>
      )}
    </button>
  );
});

export default Button;
