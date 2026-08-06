import type { ReactNode } from 'react';

/** Edge from which the drawer slides in. */
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

/**
 * Props for the Drawer component.
 */
export interface DrawerProps {
  /** Whether the drawer is open (controlled). */
  open?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Called when the drawer requests to close. */
  onClose?: () => void;
  /** Drawer content. */
  children?: ReactNode;
  /** Accessible title wired via `aria-labelledby`. */
  title?: ReactNode;
  /** Closes when the backdrop is clicked. Defaults to `true`. */
  closeOnBackdrop?: boolean;
  /** Closes when Escape is pressed. Defaults to `true`. */
  closeOnEscape?: boolean;
  /** Shows a close button. Defaults to `true`. */
  showCloseButton?: boolean;
  /** Accessible label for the close button. */
  closeLabel?: string;
  /** Locks body scroll while open. Defaults to `true`. */
  lockScroll?: boolean;
  /** Edge from which the drawer slides in. Defaults to `'right'`. */
  placement?: DrawerPlacement;
  /** Width for horizontal drawers. Defaults to `'w-80'`. */
  width?: string;
  /** Height for vertical drawers. Defaults to `'h-64'`. */
  height?: string;
  /** Additional CSS classes on the overlay. */
  className?: string;
}
