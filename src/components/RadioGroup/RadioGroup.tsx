import { useCallback, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { KEY } from '../../utils/keyboard';
import { useControllableState } from '../../hooks/useControllableState';
import { useStableId } from '../../utils/ids';
import type { RadioGroupProps } from './RadioGroup.types';

/**
 * RadioGroup — an accessible radio group with keyboard navigation.
 *
 * Follows the WAI-ARIA radio group pattern:
 * - `role="radiogroup"` with `role="radio"` items
 * - Roving tabindex: only the selected item is in the tab order
 * - Arrow keys + Home/End move focus **and** select the next enabled item
 */
export function RadioGroup({
  options,
  name,
  value,
  defaultValue,
  onValueChange,
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  const groupId = useStableId('radiogroup');
  const [selected, setSelected] = useControllableState<string>({
    value,
    defaultValue,
    onChange: (next) => onValueChange?.(next),
  });

  // Tracks which input currently holds DOM focus (drives the roving tabindex).
  const [focusedIndex, setFocusedIndex] = useState(() => {
    const index = options.findIndex((o) => o.value === selected && !o.disabled);
    return index >= 0 ? index : options.findIndex((o) => !o.disabled);
  });

  const labelId = label ? `${groupId}-label` : undefined;
  const describedBy = error || helperText ? `${groupId}-description` : undefined;
  const groupRef = useRef<HTMLDivElement>(null);

  const enabledIndices = options
    .map((o, i) => (o.disabled || disabled ? -1 : i))
    .filter((i) => i >= 0);

  // Roving tabindex target: the selected option when possible, otherwise the
  // first enabled option so the group is always reachable by Tab.
  const tabbableIndex = (() => {
    const selectedIndex = options.findIndex(
      (o) => o.value === selected && !o.disabled && !disabled,
    );
    return selectedIndex >= 0 ? selectedIndex : (enabledIndices[0] ?? -1);
  })();

  const focusOption = useCallback((index: number) => {
    const inputs = groupRef.current?.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    const target = inputs?.[index];
    if (target) {
      target.focus();
      setFocusedIndex(index);
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (enabledIndices.length === 0) return;

    const current = enabledIndices.indexOf(
      enabledIndices.includes(focusedIndex) ? focusedIndex : enabledIndices[0],
    );

    let next: number | null = null;

    if (
      orientation === 'vertical' &&
      (event.key === KEY.ARROW_DOWN || event.key === KEY.ARROW_UP)
    ) {
      event.preventDefault();
      next = event.key === KEY.ARROW_DOWN ? current + 1 : current - 1;
    } else if (
      orientation === 'horizontal' &&
      (event.key === KEY.ARROW_RIGHT || event.key === KEY.ARROW_LEFT)
    ) {
      event.preventDefault();
      next = event.key === KEY.ARROW_RIGHT ? current + 1 : current - 1;
    } else if (event.key === KEY.HOME) {
      event.preventDefault();
      next = 0;
    } else if (event.key === KEY.END) {
      event.preventDefault();
      next = enabledIndices.length - 1;
    }

    if (next !== null) {
      const clamped = Math.min(Math.max(next, 0), enabledIndices.length - 1);
      const optionIndex = enabledIndices[clamped];
      setSelected(options[optionIndex].value);
      focusOption(optionIndex);
    }
  };

  return (
    <div className={classNames('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <span id={labelId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}

      <div
        ref={groupRef}
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={classNames(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        )}
        onKeyDown={handleKeyDown}
      >
        {options.map((option, index) => {
          const isSelected = selected === option.value;
          const isDisabled = disabled || option.disabled;
          const isTabbable = index === tabbableIndex;

          return (
            <label
              key={option.value}
              className={classNames(
                'inline-flex cursor-pointer items-start gap-2.5 text-sm text-slate-700 select-none dark:text-slate-300',
                isDisabled && 'cursor-not-allowed opacity-60',
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={isDisabled}
                required={required && isSelected}
                tabIndex={isTabbable ? 0 : -1}
                onChange={() => {
                  if (!isDisabled) {
                    setSelected(option.value);
                    setFocusedIndex(index);
                  }
                }}
                onFocus={() => setFocusedIndex(index)}
                aria-checked={isSelected}
                className={classNames(
                  'mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-blue-600',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
                  'disabled:cursor-not-allowed',
                )}
              />
              <span className="flex flex-col">
                {option.label && <span className="font-medium">{option.label}</span>}
                {option.helperText && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {option.helperText}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p id={describedBy} role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : helperText ? (
        <p id={describedBy} className="text-xs text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default RadioGroup;
