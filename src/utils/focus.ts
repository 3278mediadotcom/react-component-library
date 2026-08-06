import { KEY } from './keyboard';

/**
 * Returns focusable elements inside a container.
 *
 * Note: jsdom does not implement layout (`offsetParent` is always null), so a
 * visibility check would silently filter everything out in tests. The selector
 * guards (`:not([disabled])`, `:not([tabindex="-1"])`) are sufficient for
 * overlay scopes, which are conditionally rendered.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(',');

  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Traps Tab/Shift+Tab focus within `container`.
 * Returns a cleanup function. Intended for modals and popovers.
 */
export function trapFocus(container: HTMLElement): () => void {
  const listener = (event: KeyboardEvent) => {
    if (event.key !== KEY.TAB) return;

    const elements = getFocusableElements(container);
    if (elements.length === 0) {
      event.preventDefault();
      return;
    }

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  document.addEventListener('keydown', listener);
  return () => document.removeEventListener('keydown', listener);
}
