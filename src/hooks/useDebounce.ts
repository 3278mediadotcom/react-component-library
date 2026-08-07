import { useEffect, useRef, useState } from 'react';

/**
 * Debounces a rapidly-changing value.
 *
 * Returns the `value` unchanged until `delay` ms passes without another
 * update. Useful for search-as-you-type inputs, resize observers, and any
 * other source of high-frequency updates.
 *
 * @param value The value to debounce.
 * @param delay Delay in milliseconds. Defaults to `300`.
 * @returns The debounced value.
 *
 * @example
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebounce(query, 250);
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Returns a stable `useDebounce`-compatible callback identity so callers can
 * memoize downstream work without re-running on every render.
 *
 * The returned cancel function clears any pending debounce timer.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay = 300,
): { run: (...args: Args) => void; cancel: () => void } {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const timerRef = useRef<number | null>(null);

  const run = (...args: Args) => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      callbackRef.current(...args);
    }, delay);
  };

  const cancel = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => cancel, []);

  return { run, cancel };
}

export default useDebounce;
