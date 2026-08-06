import { forwardRef, useEffect, useId, useRef } from 'react';
import { classNames } from '../../utils/classNames';
import type { CheckboxProps } from './Checkbox.types';

/**
 * Checkbox — a native, accessible checkbox with label, helper text,
 * error, and indeterminate states.
 *
 * Uses the native `<input type="checkbox">` for bulletproof keyboard
 * activation (Space toggles, Tab focuses) and screen reader semantics.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, helperText, error, disabled = false, indeterminate = false, className, id, ...rest },
  ref,
) {
  const generatedId = useId();
  const checkboxId = id ?? `checkbox-${generatedId}`;
  const helperId = helperText || error ? `${checkboxId}-description` : undefined;

  // `indeterminate` is a DOM property, not an HTML attribute.
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={classNames('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={checkboxId}
        className={classNames(
          'flex cursor-pointer items-start gap-2.5 text-sm text-slate-700 select-none dark:text-slate-300',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <input
          ref={combinedRef}
          id={checkboxId}
          type="checkbox"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={helperId}
          className={classNames(
            'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-blue-600 accent-blue-600',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
            'disabled:cursor-not-allowed',
          )}
          {...rest}
        />
        {(label || helperText || error) && (
          <span className="flex flex-col">
            {label && <span className="font-medium">{label}</span>}
            {helperText && !error && (
              <span id={helperId} className="text-xs text-slate-500 dark:text-slate-400">
                {helperText}
              </span>
            )}
          </span>
        )}
      </label>
      {error && (
        <p id={helperId} role="alert" className="mt-1 pl-6 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

export default Checkbox;
