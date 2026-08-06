import { useId } from 'react';

/**
 * Generates a stable, sanitized unique id for ARIA attribute wiring.
 *
 * React's `useId` output contains characters like `:` that are invalid in CSS
 * selectors and some query APIs; stripping them makes the id safe everywhere.
 *
 * @example
 * const listboxId = useStableId('select'); // => "select-r1"
 */
export function useStableId(prefix: string): string {
  const reactId = useId();
  const sanitized = reactId.replace(/[^a-zA-Z0-9_-]/g, '');
  return `${prefix}-${sanitized}`;
}
