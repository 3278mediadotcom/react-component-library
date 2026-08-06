/**
 * Accessibility helpers shared across components.
 *
 * Keeping ARIA-related utilities in one place ensures consistent,
 * WCAG-compliant behavior across the entire component library.
 */

/**
 * Generates a unique id with an optional prefix.
 * Used to associate ARIA attributes (e.g. aria-labelledby, aria-describedby).
 *
 * @example
 * createIdPrefix('menu') // => "menu-1b2c3d4e"
 */
export function createIdPrefix(prefix: string): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Locks body scrolling while an overlay (modal, drawer, menu) is open.
 * Returns a cleanup function that restores the previous overflow value.
 */
export function lockBodyScroll(): () => void {
  const previous = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = previous;
  };
}

/**
 * Returns the `role` value appropriate for a component that toggles
 * an expandable region (accessible disclosure pattern).
 */
export const disclosureTriggerRole = (expanded: boolean): 'button' | 'menuitem' =>
  expanded ? 'menuitem' : 'button';

/**
 * Returns aria attributes for an expandable/collapsible region.
 */
export function disclosureAttributes(expanded: boolean) {
  return {
    'aria-expanded': expanded,
  };
}
