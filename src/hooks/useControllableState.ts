import { useCallback, useRef, useState } from 'react';

export type SetStateAction<T> = T | ((prev: T) => T);

/**
 * Supports both controlled and uncontrolled usage of a state value —
 * the same pattern React uses internally (e.g. `useControllableState` in Radix).
 *
 * - When `value` is provided, the component is controlled: the returned state
 *   always mirrors `value` and `setState` only forwards to `onChange`.
 * - When `value` is `undefined`, the component manages its own state and
 *   `defaultValue` seeds it.
 *
 * @param param0 `{ value, defaultValue, onChange }`
 * @returns `[state, setState]`
 *
 * @example
 * const [value, setValue] = useControllableState({
 *   value: props.value,
 *   defaultValue: props.defaultValue,
 *   onChange: props.onChange,
 * });
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}): [T, (next: SetStateAction<T>) => void] {
  const [internalState, setInternalState] = useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;

  const state = (isControlled ? value : internalState) as T;

  // Keep the latest onChange in a ref so callers don't need useCallback wrappers.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Latest state mirror so functional updates always see fresh values.
  const stateRef = useRef(state);
  stateRef.current = state;

  const setState = useCallback(
    (next: SetStateAction<T>) => {
      const resolved =
        typeof next === 'function' ? (next as (prev: T) => T)(stateRef.current) : next;
      stateRef.current = resolved;

      if (isControlled) {
        // Controlled: only report the change; the owner re-renders with the
        // new value (or keeps the old one, effectively ignoring it).
        onChangeRef.current?.(resolved);
      } else {
        setInternalState(resolved);
        onChangeRef.current?.(resolved);
      }
    },
    [isControlled],
  );

  return [state, setState];
}
