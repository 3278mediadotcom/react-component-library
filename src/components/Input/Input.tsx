import { forwardRef, useId } from 'react';
import { classNames } from '../../utils/classNames';
import type { InputProps } from './Input.types';

const BASE_INPUT_CLASSES =
  'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500';

const STATE_CLASSES = {
  normal:
    'border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:ring-blue-500/30 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-blue-500',
  error:
    'border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500 dark:focus:border-red-500',
  disabled:
    'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-700',
} as const;

/**
 * Input — a fully accessible text field with label, icons, prefix/suffix,
 * helper text, and error states.
 *
 * Associates the label via `htmlFor`, announces errors via `aria-invalid`,
 * and wires helper/error text through `aria-describedby`.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    label,
    placeholder,
    helperText,
    error,
    disabled = false,
    required = false,
    prefix,
    suffix,
    leftIcon,
    rightIcon,
    className,
    id,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const hasPrefix = Boolean(prefix);
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);
  const hasSuffix = Boolean(suffix);

  const paddingLeft = hasLeftIcon ? 'pl-9' : hasPrefix ? 'pl-12' : undefined;
  const paddingRight = hasRightIcon ? 'pr-9' : hasSuffix ? 'pr-12' : undefined;

  return (
    <div className={classNames('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 [&>svg]:h-4 [&>svg]:w-4"
          >
            {leftIcon}
          </span>
        )}
        {prefix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-500"
          >
            {prefix}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={classNames(
            BASE_INPUT_CLASSES,
            STATE_CLASSES.normal,
            error ? STATE_CLASSES.error : '',
            STATE_CLASSES.disabled,
            paddingLeft,
            paddingRight,
          )}
          {...rest}
        />

        {suffix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500"
          >
            {suffix}
          </span>
        )}
        {rightIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 [&>svg]:h-4 [&>svg]:w-4"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
