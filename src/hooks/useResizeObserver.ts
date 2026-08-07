import { useEffect, useRef, useState } from 'react';

export interface ResizeObserverEntryLike {
  width: number;
  height: number;
  entry?: ResizeObserverEntry;
}

/**
 * Observes an element's size with `ResizeObserver` and reports it as state.
 *
 * Useful for responsive layout primitives, sticky headers, and measuring
 * container queries by hand. Returns a ref to attach and the current size.
 *
 * @param ref A ref to the element to observe (must be populated). When omitted,
 *   the hook returns its own ref to attach.
 * @returns `[ref, size]` — attach `ref` to the element and read `size`.
 *
 * @example
 * const [ref, size] = useResizeObserver<HTMLDivElement>();
 * return <div ref={ref}>Width: {size.width}px</div>;
 */
export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  ref?: React.RefObject<T | null>,
): [React.RefObject<T | null>, ResizeObserverEntryLike] {
  const internalRef = useRef<T | null>(null);
  const targetRef = ref ?? internalRef;

  const [size, setSize] = useState<ResizeObserverEntryLike>({ width: 0, height: 0 });

  useEffect(() => {
    const element = targetRef.current;
    if (!element || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height, entry });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [targetRef]);

  return [targetRef, size];
}

export default useResizeObserver;
