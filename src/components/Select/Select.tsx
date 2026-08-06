import { useCallback, useMemo, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { KEY } from '../../utils/keyboard';
import { useStableId } from '../../utils/ids';
import { useControllableState } from '../../hooks/useControllableState';
import { useClickOutside } from '../../hooks/useClickOutside';
import type { SelectProps } from './Select.types';

const TYPE_AHEAD_RESET_MS = 700;

/**
 * Select — an accessible single-select combobox.
 *
 * Implements the full WAI-ARIA combobox pattern:
 * - `role="combobox"` / `role="listbox"` / `role="option"`
 * - Full keyboard support: arrows, Home/End, Enter, Escape, type-ahead
 * - Controlled + uncontrolled usage via `useControllableState`
 * - Optional clear button
 */
export function Select({
  options,
  value,
  defaultValue = '',
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  label,
  helperText,
  error,
  required = false,
  clearable = false,
  clearLabel = 'Clear selection',
  className,
}: SelectProps) {
  const [selected, setSelected] = useControllableState<string>({
    value,
    defaultValue,
    onChange: (next) => onValueChange?.(next),
  });

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const typeAheadRef = useRef({ buffer: '', timestamp: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const baseId = useStableId('select');
  const comboboxId = label ? `${baseId}-combobox` : undefined;
  const labelId = label ? `${baseId}-label` : undefined;
  const listboxId = `${baseId}-listbox`;
  const helperId = error || helperText ? `${baseId}-description` : undefined;

  const enabledOptions = useMemo(
    () =>
      options.map((option, index) => ({ option, index })).filter(({ option }) => !option.disabled),
    [options],
  );

  const selectValue = useCallback(
    (next: string) => {
      setSelected(next);
    },
    [setSelected],
  );

  const scrollIntoView = useCallback((index: number) => {
    const listbox = listboxRef.current;
    const optionsEl = listbox?.querySelectorAll<HTMLLIElement>('[role="option"]');
    const target = optionsEl?.[index];
    // jsdom does not implement scrollIntoView; the guard keeps tests happy
    // while production browsers get the behavior.
    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ block: 'nearest' });
    }
  }, []);

  const openListbox = useCallback(() => {
    if (disabled) return;
    const initialIndex = selected
      ? enabledOptions.findIndex(({ option }) => option.value === selected)
      : 0;
    setActiveIndex(initialIndex >= 0 ? initialIndex : 0);
    setOpen(true);
  }, [disabled, enabledOptions, selected]);

  const closeListbox = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const moveActive = useCallback(
    (delta: number) => {
      const count = enabledOptions.length;
      if (count === 0) return;
      // Compute the next index from the closure (fresh each render), then set
      // state and scroll as separate steps — no side effects inside reducers.
      const next = Math.min(Math.max(activeIndex + delta, 0), count - 1);
      setActiveIndex(next);
      scrollIntoView(next);
    },
    [enabledOptions.length, activeIndex, scrollIntoView],
  );

  const goToStart = useCallback(() => {
    setActiveIndex(0);
    scrollIntoView(0);
  }, [scrollIntoView]);

  const goToEnd = useCallback(() => {
    if (enabledOptions.length === 0) return;
    const last = enabledOptions.length - 1;
    setActiveIndex(last);
    scrollIntoView(last);
  }, [enabledOptions.length, scrollIntoView]);

  // Type-ahead: jump to the first option whose label starts with the buffer.
  const handleTypeAhead = useCallback(
    (key: string) => {
      const now = Date.now();
      const { buffer, timestamp } = typeAheadRef.current;
      const nextBuffer = now - timestamp > TYPE_AHEAD_RESET_MS ? key : (buffer + key).toLowerCase();

      typeAheadRef.current = { buffer: nextBuffer, timestamp: now };

      const matchIndex = enabledOptions.findIndex(({ option }) =>
        option.label.toLowerCase().startsWith(nextBuffer),
      );
      if (matchIndex >= 0) {
        setActiveIndex(matchIndex);
        scrollIntoView(matchIndex);
      }
    },
    [enabledOptions, scrollIntoView],
  );

  const handleComboboxKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (!open) {
      switch (event.key) {
        case KEY.ARROW_DOWN:
        case KEY.ARROW_UP:
        case KEY.ENTER:
        case KEY.SPACE:
          event.preventDefault();
          openListbox();
          break;
        default:
          // Single printable characters trigger type-ahead directly.
          if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            openListbox();
            handleTypeAhead(event.key);
          }
      }
      return;
    }

    switch (event.key) {
      case KEY.ARROW_DOWN:
        event.preventDefault();
        moveActive(1);
        break;
      case KEY.ARROW_UP:
        event.preventDefault();
        moveActive(-1);
        break;
      case KEY.HOME:
        event.preventDefault();
        goToStart();
        break;
      case KEY.END:
        event.preventDefault();
        goToEnd();
        break;
      case KEY.ENTER:
      case KEY.SPACE:
        event.preventDefault();
        if (activeIndex >= 0 && enabledOptions[activeIndex]) {
          selectValue(enabledOptions[activeIndex].option.value);
          closeListbox();
        }
        break;
      case KEY.ESCAPE:
        event.preventDefault();
        closeListbox();
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          handleTypeAhead(event.key);
        }
    }
  };

  const handleOptionClick = (optionValue: string) => {
    selectValue(optionValue);
    closeListbox();
  };

  // Close when clicking/tapping outside.
  useClickOutside(containerRef, closeListbox, open && !disabled);

  const selectedOption = options.find((o) => o.value === selected);
  const display = selectedOption ? selectedOption.label : placeholder;

  return (
    <div ref={containerRef} className={classNames('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <label id={labelId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <div
          id={comboboxId}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          aria-invalid={error ? true : undefined}
          aria-describedby={helperId}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
          aria-activedescendant={
            open && activeIndex >= 0
              ? `${baseId}-option-${enabledOptions[activeIndex]?.option.value ?? ''}`
              : undefined
          }
          onClick={() => (open ? closeListbox() : openListbox())}
          onKeyDown={handleComboboxKeyDown}
          className={classNames(
            'flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
            'focus:outline-none focus:ring-2 dark:bg-slate-900',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500'
              : 'border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:ring-blue-500/30 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-blue-500',
            disabled && 'cursor-not-allowed opacity-60',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
          )}
        >
          <span
            className={classNames(
              'truncate',
              selectedOption
                ? 'text-slate-900 dark:text-slate-100'
                : 'text-slate-400 dark:text-slate-500',
            )}
          >
            {display}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            {clearable && selectedOption && !disabled && (
              <button
                type="button"
                aria-label={clearLabel}
                onClick={(event) => {
                  event.stopPropagation();
                  selectValue('');
                  closeListbox();
                }}
                className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={classNames(
                'h-4 w-4 text-slate-400 transition-transform',
                open && 'rotate-180',
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>

        {open && (
          <ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-label={label ?? 'Options'}
            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
          >
            {enabledOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-slate-400 dark:text-slate-500">No options</li>
            )}
            {enabledOptions.map(({ option, index }) => {
              const isActive = index === activeIndex;
              const isSelected = option.value === selected;

              return (
                <li
                  key={option.value}
                  role="option"
                  id={`${baseId}-option-${option.value}`}
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleOptionClick(option.value)}
                  className={classNames(
                    'cursor-pointer px-3 py-2 text-sm',
                    isActive ? 'bg-blue-50 dark:bg-blue-950' : '',
                    isSelected
                      ? 'font-semibold text-blue-700 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300',
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate">{option.label}</span>
                    {option.hint && (
                      <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                        {option.hint}
                      </span>
                    )}
                    {isSelected && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error ? (
        <p id={helperId} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default Select;
