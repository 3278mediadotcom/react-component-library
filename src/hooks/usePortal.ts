import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Creates (and cleans up) a portal container for overlays.
 *
 * @param containerId - Optional id assigned to the portal container.
 * @returns The portal container element, or `null` until mounted (enables SSR).
 */
export function usePortal(containerId?: string): HTMLElement | null {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    if (containerId) el.id = containerId;
    document.body.appendChild(el);
    setContainer(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [containerId]);

  return container;
}

export { createPortal };
