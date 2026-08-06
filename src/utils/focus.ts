import { KEY } from './keyboard';

/**
 * Returns the first and last focusable elements inside a container.
 * Used by list navigation and (later) focus trapping for overlays.
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

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  );
}

/**
 * Returns indices for first/last elements, or -1 when none are focusable.
 * Returns `{ first, last }` so any single focusable element yields both.
 */
export function getFocusableBounds(container: HTMLElement): { first: number; last: number } {
  const elements = getFocusableElements(container);
  return {
    first: elements.length > 0 ? 0 : -1,
    last: elements.length > 0 ? elements.length - 1 : -1,
  };
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
