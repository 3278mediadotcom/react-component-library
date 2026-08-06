import { useCallback } from 'react';
import { KEY } from '../utils/keyboard';

export type Orientation = 'horizontal' | 'vertical';

export interface UseKeyboardNavigationOptions {
  /** Number of navigable items. */
  count: number;
  /** Current focused/active index. */
  index: number;
  /** Called with the next index when navigation occurs. */
  onIndexChange: (nextIndex: number) => void;
  /** Wrap around at the ends (carousel-style). Defaults to `false`. */
  loop?: boolean;
  /** Whether Home/End keys are honored. Defaults to `true`. */
  homeEnd?: boolean;
  /** Arrow key direction for the active axis. Defaults to `'vertical'`. */
  orientation?: Orientation;
}

/**
 * Shared arrow-key navigation for lists, tabs, and radio groups.
 *
 * Handles ArrowUp/ArrowDown (vertical) and ArrowLeft/ArrowRight (horizontal),
 * plus optional Home/End. Returns a `handleKeyDown` handler.
 *
 * @example
 * const handleKeyDown = useKeyboardNavigation({
 *   count: options.length,
 *   index: activeIndex,
 *   onIndexChange: setActiveIndex,
 *   orientation: 'vertical',
 * });
 */
export function useKeyboardNavigation({
  count,
  index,
  onIndexChange,
  loop = false,
  homeEnd = true,
  orientation = 'vertical',
}: UseKeyboardNavigationOptions) {
  const clamp = useCallback(
    (next: number) => {
      if (loop) {
        return (next + count) % count;
      }
      return Math.min(Math.max(next, 0), count - 1);
    },
    [count, loop],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (count === 0) return;

      let next: number | null = null;

      if (
        orientation === 'vertical' &&
        (event.key === KEY.ARROW_UP || event.key === KEY.ARROW_DOWN)
      ) {
        event.preventDefault();
        next = event.key === KEY.ARROW_DOWN ? index + 1 : index - 1;
      } else if (
        orientation === 'horizontal' &&
        (event.key === KEY.ARROW_LEFT || event.key === KEY.ARROW_RIGHT)
      ) {
        event.preventDefault();
        next = event.key === KEY.ARROW_RIGHT ? index + 1 : index - 1;
      } else if (homeEnd && event.key === KEY.HOME) {
        event.preventDefault();
        next = 0;
      } else if (homeEnd && event.key === KEY.END) {
        event.preventDefault();
        next = count - 1;
      }

      if (next !== null) {
        onIndexChange(clamp(next));
      }
    },
    [count, index, onIndexChange, clamp, homeEnd, orientation],
  );

  return handleKeyDown;
}

export default useKeyboardNavigation;
