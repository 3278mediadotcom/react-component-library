/**
 * Keyboard interaction helpers for accessible components.
 *
 * These utilities centralize common key-handling logic so that every
 * component in the library behaves consistently (e.g. Escape closes
 * modals, Enter/Space activate buttons).
 */

export const KEY = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
} as const;

export type KeyValue = (typeof KEY)[keyof typeof KEY];

export const isEnter = (event: KeyboardEvent): boolean => event.key === KEY.ENTER;
export const isSpace = (event: KeyboardEvent): boolean => event.key === KEY.SPACE;
export const isEscape = (event: KeyboardEvent): boolean => event.key === KEY.ESCAPE;
export const isTab = (event: KeyboardEvent): boolean => event.key === KEY.TAB;

export const isArrowUp = (event: KeyboardEvent): boolean => event.key === KEY.ARROW_UP;
export const isArrowDown = (event: KeyboardEvent): boolean => event.key === KEY.ARROW_DOWN;
export const isArrowLeft = (event: KeyboardEvent): boolean => event.key === KEY.ARROW_LEFT;
export const isArrowRight = (event: KeyboardEvent): boolean => event.key === KEY.ARROW_RIGHT;

export const isHome = (event: KeyboardEvent): boolean => event.key === KEY.HOME;
export const isEnd = (event: KeyboardEvent): boolean => event.key === KEY.END;

/**
 * Returns true when the Enter or Space key is pressed:
 * the standard activation keys for interactive elements.
 */
export const isActivationKey = (event: KeyboardEvent): boolean => isEnter(event) || isSpace(event);

/**
 * Invokes a callback when the Escape key is pressed.
 * Useful for closing overlays, menus, and dialogs.
 */
export function onEscape(handler: (event: KeyboardEvent) => void) {
  return (event: KeyboardEvent): void => {
    if (isEscape(event)) {
      handler(event);
    }
  };
}
