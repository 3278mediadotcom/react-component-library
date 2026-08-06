import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

/**
 * Creates a plain portal to a target container.
 *
 * Prefer `usePortal` (which manages the container lifecycle) in components;
 * this helper is for one-off rendering or SSR-safe environments where the
 * container already exists.
 */
export function renderToPortal(children: ReactNode, container: Element | DocumentFragment | null) {
  if (!container || typeof document === 'undefined') return null;
  return createPortal(children, container);
}

export default renderToPortal;
