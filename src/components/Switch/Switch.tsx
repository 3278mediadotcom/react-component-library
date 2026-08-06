import { forwardRef, useId } from 'react';
import { classNames } from '../../utils/classNames';
import { useControllableState } from '../../hooks/useControllableState';
import { Spinner } from '../Spinner';
import type { SwitchProps } from './Switch.types';

/**
 * Switch — an accessible on/off toggle.
 *
 * Rendered as a `<button role="switch">` so it is keyboard activatable
 * (Enter/Space) and announced correctly by screen readers via `aria-checked`.
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked = false,
    onCheckedChange,
    label,
    disabled = false,
    loading = false,
    checkedIcon,
    uncheckedIcon,
    className,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const labelId = label ? `switch-label-${generatedId}` : undefined;

  const [isOn, setIsOn] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked,
    onChange: (next) => onCheckedChange?.(next),
  });

  const isDisabled = disabled || loading;

  const handleClick = () => {
    if (isDisabled) return;
    setIsOn((prev) => !prev);
  };

  return (
    <div className={classNames('inline-flex items-center gap-2.5', className)}>
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={isDisabled}
        aria-labelledby={labelId}
        onClick={handleClick}
        className={classNames(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
          isOn ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-300 dark:bg-slate-700',
          isDisabled && 'cursor-not-allowed opacity-50',
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={classNames(
            'pointer-events-none inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform duration-200',
            isOn ? 'translate-x-5' : 'translate-x-0.5',
          )}
        >
          {loading ? (
            <Spinner size="xs" variant="dark" decorative />
          ) : isOn && checkedIcon ? (
            <span className="text-[10px] text-blue-600">{checkedIcon}</span>
          ) : !isOn && uncheckedIcon ? (
            <span className="text-[10px] text-slate-400">{uncheckedIcon}</span>
          ) : null}
        </span>
      </button>
      {label && (
        <span
          id={labelId}
          className="text-sm font-medium text-slate-700 select-none dark:text-slate-300"
        >
          {label}
        </span>
      )}
    </div>
  );
});

export default Switch;
