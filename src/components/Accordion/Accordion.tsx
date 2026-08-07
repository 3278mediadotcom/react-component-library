import { useCallback, useRef } from 'react';
import { classNames } from '../../utils/classNames';
import { KEY } from '../../utils/keyboard';
import { useStableId } from '../../utils/ids';
import { useControllableState } from '../../hooks/useControllableState';
import type { AccordionProps } from './Accordion.types';

/** Default: open the first non-disabled item for single, none for multiple. */
function defaultOpenValues(items: AccordionProps['items'], type: 'single' | 'multiple'): string[] {
  if (type === 'multiple') return [];
  const firstEnabled = items.find((item) => !item.disabled);
  return firstEnabled ? [firstEnabled.value] : [];
}

/**
 * Accordion — a vertically stacking set of expandable panels.
 *
 * Follows the WAI-ARIA accordion pattern:
 * - Triggers expose `aria-expanded` and `aria-controls`.
 * - Panels expose `role="region"` with `aria-labelledby` pointing at their
 *   trigger.
 * - Roving tabindex: only the active trigger is in the tab order.
 * - Arrow Up/Down, Home, End navigate between triggers.
 */
export function Accordion({
  items,
  value,
  defaultValue,
  onValueChange,
  type = 'single',
  collapsible = true,
  className,
  ...rest
}: AccordionProps) {
  const baseId = useStableId('accordion');
  const containerRef = useRef<HTMLDivElement>(null);

  const initialValue = defaultValue ?? defaultOpenValues(items, type);
  const [openValues, setOpenValues] = useControllableState<string[]>({
    value,
    defaultValue: initialValue,
    onChange: (next) => onValueChange?.(next),
  });

  const enabledIndexes = items
    .map((item, index) => (item.disabled ? -1 : index))
    .filter((index) => index >= 0);

  const isOpen = useCallback((itemValue: string) => openValues.includes(itemValue), [openValues]);

  const toggleItem = (itemValue: string) => {
    const willOpen = !isOpen(itemValue);

    if (type === 'multiple') {
      setOpenValues(
        willOpen ? [...openValues, itemValue] : openValues.filter((v) => v !== itemValue),
      );
      return;
    }

    // Single mode: opening one closes all; closing depends on collapsible.
    if (willOpen) {
      setOpenValues([itemValue]);
    } else if (collapsible) {
      setOpenValues([]);
    }
  };

  const focusTrigger = (index: number) => {
    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>(
      '[data-accordion-trigger]',
    );
    buttons?.[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (enabledIndexes.length === 0) return;

    const currentIndex = (() => {
      // Find the focused trigger's index among enabled items.
      const focused = event.currentTarget.querySelector<HTMLElement>(':focus');
      const allTriggers = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]'),
      );
      const domIndex = allTriggers.findIndex((el) => el === focused);
      const enabledDomIndexes = items
        .map((item, i) => (item.disabled ? -1 : i))
        .filter((i) => i >= 0);
      return domIndex >= 0 ? enabledDomIndexes.indexOf(domIndex) : 0;
    })();

    let next: number | null = null;

    if (event.key === KEY.ARROW_DOWN) {
      event.preventDefault();
      next = currentIndex + 1;
    } else if (event.key === KEY.ARROW_UP) {
      event.preventDefault();
      next = currentIndex - 1;
    } else if (event.key === KEY.HOME) {
      event.preventDefault();
      next = 0;
    } else if (event.key === KEY.END) {
      event.preventDefault();
      next = enabledIndexes.length - 1;
    }

    if (next !== null) {
      const clamped = Math.min(Math.max(next, 0), enabledIndexes.length - 1);
      focusTrigger(enabledIndexes[clamped]);
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={classNames('divide-y divide-slate-200 dark:divide-slate-800', className)}
      {...rest}
    >
      {items.map((item, index) => {
        const open = isOpen(item.value);
        const disabled = item.disabled === true;
        const panelId = `${baseId}-panel-${index}`;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelPresent = !!item.content;
        // WAI-ARIA: the currently-open (or first enabled) trigger owns the
        // tab stop; arrow keys move focus between the rest.
        const isRovingTarget = open || (openValues.length === 0 && index === enabledIndexes[0]);

        return (
          <div key={item.value} className="rounded-lg">
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                data-accordion-trigger
                aria-expanded={open}
                aria-controls={panelId}
                aria-disabled={disabled || undefined}
                disabled={disabled}
                tabIndex={isRovingTarget ? 0 : -1}
                onClick={() => toggleItem(item.value)}
                className={classNames(
                  'flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-100 dark:hover:bg-slate-900',
                  disabled &&
                    'cursor-not-allowed opacity-50 hover:bg-transparent dark:hover:bg-transparent',
                )}
              >
                {item.header}
                <span
                  aria-hidden="true"
                  className={classNames(
                    'text-slate-400 transition-transform duration-200 dark:text-slate-500',
                    open && 'rotate-180',
                  )}
                >
                  ▾
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!open || !panelPresent || undefined}
              className={classNames(
                'grid transition-[grid-template-rows] duration-200 ease-out',
                open && panelPresent ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-300">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
