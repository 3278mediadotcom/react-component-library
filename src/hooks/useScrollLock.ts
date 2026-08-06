import { useEffect } from 'react';
import { lockBodyScroll } from '../utils/accessibility';

/**
 * Locks body scrolling while the hook is active.
 *
 * Wraps `lockBodyScroll` so the lock is applied in an effect and removed on
 * unmount — the standard lifecycle for overlays that should block
 * background scrolling (Modal, Drawer).
 */
export function useScrollLock(enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    const unlock = lockBodyScroll();
    return unlock;
  }, [enabled]);
}

export default useScrollLock;
