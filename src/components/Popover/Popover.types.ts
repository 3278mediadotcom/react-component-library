import type { ReactNode } from 'react';
import type { FloatingPlacement } from '../../hooks/useFloatingPosition';

export type { FloatingPlacement as PopoverPlacement };

/**
 * Props for the Popover component.
 */
export interface PopoverProps {
  /** Trigger element (a single element that can receive refs/handlers). */
  children?: ReactNode;
  /** Popover content (arbitrary JSX — menus, forms, cards). */
  content?: ReactNode;
  /** Placement relative to the trigger. Defaults to `'bottom'`. */
  placement?: FloatingPlacement;
  /** Closes when clicking outside. Defaults to `true`. */
  closeOnOutsideClick?: boolean;
  /** Closes when Escape is pressed. Defaults to `true`. */
  closeOnEscape?: boolean;
  /** Closes when an item inside is clicked. Defaults to `false`. */
  closeOnItemClick?: boolean;
  /** Defaults to `'Popover'`; sets the accessible name. */
  'aria-label'?: string;
  /** Additional CSS classes on the popover panel. */
  className?: string;
}
