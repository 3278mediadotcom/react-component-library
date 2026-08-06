import { useCallback, useId, useRef } from 'react';
import { classNames } from '../../utils/classNames';
import { KEY } from '../../utils/keyboard';
import { useControllableState } from '../../hooks/useControllableState';
import type { TabsProps } from './Tabs.types';

/**
 * Tabs — an accessible tab interface with keyboard navigation.
 *
 * Follows the WAI-ARIA tabs pattern:
 * - `role="tablist"` / `role="tab"` / `role="tabpanel"`
 * - Roving tabindex: only the active tab is in the tab order
 * - Arrow keys + Home/End navigate; Enter/Space select
 */
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  label,
  className,
  ...rest
}: TabsProps) {
  const reactId = useId();
  const baseId = `tabs-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const enabledIndexes = items
    .map((item, index) => (item.disabled ? -1 : index))
    .filter((index) => index >= 0);

  const initialValue = (() => {
    if (defaultValue && enabledIndexes.some((i) => items[i].value === defaultValue)) {
      return defaultValue;
    }
    const firstEnabled = enabledIndexes[0];
    return firstEnabled !== undefined ? items[firstEnabled].value : '';
  })();

  const [activeValue, setActiveValue] = useControllableState<string>({
    value,
    defaultValue: initialValue,
    onChange: (next) => onValueChange?.(next),
  });

  const tabListRef = useRef<HTMLDivElement>(null);

  const focusTab = useCallback((index: number) => {
    const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    const target = buttons?.[index];
    if (target) target.focus();
  }, []);

  const handleTabListKeyDown = (event: React.KeyboardEvent) => {
    if (enabledIndexes.length === 0) return;

    const currentIndex = (() => {
      const found = enabledIndexes.findIndex((i) => items[i].value === activeValue);
      return found >= 0 ? found : 0;
    })();

    let next: number | null = null;

    if (
      orientation === 'horizontal' &&
      (event.key === KEY.ARROW_RIGHT || event.key === KEY.ARROW_LEFT)
    ) {
      event.preventDefault();
      next = event.key === KEY.ARROW_RIGHT ? currentIndex + 1 : currentIndex - 1;
    } else if (
      orientation === 'vertical' &&
      (event.key === KEY.ARROW_DOWN || event.key === KEY.ARROW_UP)
    ) {
      event.preventDefault();
      next = event.key === KEY.ARROW_DOWN ? currentIndex + 1 : currentIndex - 1;
    } else if (event.key === KEY.HOME) {
      event.preventDefault();
      next = 0;
    } else if (event.key === KEY.END) {
      event.preventDefault();
      next = enabledIndexes.length - 1;
    }

    if (next !== null) {
      const clamped = Math.min(Math.max(next, 0), enabledIndexes.length - 1);
      const targetIndex = enabledIndexes[clamped];
      // WAI-ARIA: only arrow keys select; Home/End move focus only.
      const arrowKeys: string[] = [KEY.ARROW_RIGHT, KEY.ARROW_LEFT, KEY.ARROW_DOWN, KEY.ARROW_UP];
      const isArrowKey = arrowKeys.includes(event.key);
      if (isArrowKey) {
        setActiveValue(items[targetIndex].value);
      }
      focusTab(targetIndex);
    }
  };

  return (
    <div
      className={classNames(
        'flex',
        orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col',
        className,
      )}
      {...rest}
    >
      <div
        ref={tabListRef}
        role="tablist"
        aria-label={label}
        aria-orientation={orientation}
        onKeyDown={handleTabListKeyDown}
        className={classNames(
          'flex gap-1 border-b border-slate-200 dark:border-slate-800',
          orientation === 'vertical' && 'flex-col border-b-0 border-r',
        )}
      >
        {items.map((item, index) => {
          const isActive = item.value === activeValue;
          const isEnabled = !item.disabled;
          const isSelected = isActive && isEnabled;

          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isSelected ? 0 : -1}
              disabled={!isEnabled}
              onClick={() => {
                if (isEnabled) {
                  setActiveValue(item.value);
                  focusTab(index);
                }
              }}
              className={classNames(
                'inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
                isSelected
                  ? 'border-blue-600 text-blue-700 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
                !isEnabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {item.icon && (
                <span aria-hidden="true" className="[&>svg]:h-4 [&>svg]:w-4">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => {
        const isActive = item.value === activeValue && !item.disabled;

        return (
          <div
            key={item.value}
            role="tabpanel"
            id={`${baseId}-panel-${index}`}
            aria-labelledby={`${baseId}-tab-${index}`}
            tabIndex={0}
            hidden={!isActive}
            className={classNames(
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
              orientation === 'vertical' ? 'flex-1' : 'pt-4',
            )}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;
