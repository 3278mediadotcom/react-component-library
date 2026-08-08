import { useEffect, type RefObject } from 'react';

type OutsideRef<T extends HTMLElement> = RefObject<T | null>;

/**
 * Invokes `handler` when a pointer event occurs outside all provided elements.
 *
 * Useful for closing popovers, menus, and selects on outside interaction.
 * Uses `mousedown` so it fires before `click` handlers in the document.
 *
 * Accepts one or more refs — pass every element that should count as "inside"
 * (for example a trigger **and** a portal-rendered floating panel, since a
 * portal lives in `document.body` and is not a DOM descendant of the trigger).
 */
export function useClickOutside<T extends HTMLElement>(
  ref: OutsideRef<T> | ReadonlyArray<OutsideRef<T>>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    const refs = Array.isArray(ref) ? ref : [ref];

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const inside = refs.some((r) => {
        const el = r.current;
        return el != null && el.contains(target);
      });
      if (inside) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}

export default useClickOutside;
