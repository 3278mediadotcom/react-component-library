import { useEffect } from 'react';
import { KEY } from '../utils/keyboard';

/**
 * Invokes `handler` when the Escape key is pressed globally.
 *
 * Used by Modal, Drawer, Popover, and Tooltip to close on Escape.
 */
export function useEscapeKey(handler: (event: KeyboardEvent) => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === KEY.ESCAPE) {
        handler(event);
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [handler, enabled]);
}

export default useEscapeKey;
