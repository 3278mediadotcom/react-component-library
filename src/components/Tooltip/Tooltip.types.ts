import type { ReactNode } from 'react';
import type { FloatingPlacement } from '../../hooks/useFloatingPosition';

export type { FloatingPlacement as TooltipPlacement };

/**
 * Props for the Tooltip component.
 */
export interface TooltipProps {
  /** Element that opens the tooltip on hover/focus. The element is cloned with
   *  hover/focus handlers and `aria-describedby`; a single DOM element is
   *  recommended. */
  children?: ReactNode;
  /** Tooltip content. */
  content: ReactNode;
  /** Placement relative to the trigger. Defaults to `'top'`. */
  placement?: FloatingPlacement;
  /** Delay in ms before the tooltip appears. Defaults to `150`. */
  delay?: number;
  /** Shows a small arrow pointing at the trigger. Defaults to `true`. */
  arrow?: boolean;
  /** Disables the tooltip entirely. */
  disabled?: boolean;
  /** Additional CSS classes on the tooltip. */
  className?: string;
}
