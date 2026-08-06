import type { ReactNode } from 'react';

/**
 * Props for the Modal component.
 */
export interface ModalProps {
  /** Whether the modal is open (controlled). */
  open?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Called when the modal requests to close (Escape, backdrop, close button). */
  onClose?: () => void;
  /** Modal content. */
  children?: ReactNode;
  /** Accessible title rendered in the header and wired via `aria-labelledby`. */
  title?: ReactNode;
  /** Accessible description rendered in the body and wired via `aria-describedby`. */
  description?: ReactNode;
  /** Closes when the backdrop is clicked. Defaults to `true`. */
  closeOnBackdrop?: boolean;
  /** Closes when Escape is pressed. Defaults to `true`. */
  closeOnEscape?: boolean;
  /** Shows a close button in the header. Defaults to `true`. */
  showCloseButton?: boolean;
  /** Accessible label for the close button. */
  closeLabel?: string;
  /** Locks body scroll while open. Defaults to `true`. */
  lockScroll?: boolean;
  /** Additional CSS classes on the overlay. */
  className?: string;
  /** Width of the modal panel. Defaults to `'md'`. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
