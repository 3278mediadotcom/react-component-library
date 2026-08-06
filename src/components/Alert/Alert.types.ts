import type { ReactNode } from 'react';

/** Semantic tones for the alert. */
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Props for the Alert component.
 *
 * Accessible role selection: `danger`/`warning` use `role="alert"`
 * (assertive, immediate announcement); `info`/`success`/`neutral` use
 * `role="status"` (polite announcement).
 */
export interface AlertProps {
  /** Alert content. */
  children: ReactNode;
  /** Optional title rendered in bold above the content. */
  title?: string;
  /** Custom icon override. Defaults to a variant-appropriate icon. */
  icon?: ReactNode;
  /** Semantic tone. Defaults to `'info'`. */
  variant?: AlertVariant;
  /** Shows a dismiss button; requires `onDismiss`. */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void;
  /** Additional CSS classes on the alert root. */
  className?: string;
}
