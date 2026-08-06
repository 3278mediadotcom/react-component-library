import type { ReactNode } from 'react';

/** Semantic tone of a toast. */
export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

/** A single toast entry managed by the provider. */
export interface ToastItem {
  /** Stable unique id. */
  id: string;
  /** Toast content. */
  content: ReactNode;
  /** Semantic tone. */
  variant: ToastVariant;
  /** Title rendered in bold when provided. */
  title?: string;
  /** Auto-dismiss delay in ms. `0` keeps the toast until manually dismissed. */
  duration: number;
  /** Whether the toast is currently visible (for exit animation). */
  visible: boolean;
}

/** Data passed to the toast constructor methods. */
export interface ToastOptions {
  /** Toast content (text or any React node). */
  content: ReactNode;
  /** Optional bold title. */
  title?: string;
  /** Auto-dismiss delay in ms. Defaults to provider `duration`. `0` = persistent. */
  duration?: number;
}

/** The shape exposed by `useToast()`. */
export interface ToastApi {
  /** Push a toast with an explicit variant. */
  show: (variant: ToastVariant, options: ToastOptions) => string;
  /** Push a success toast. */
  success: (options: ToastOptions) => string;
  /** Push an error toast. */
  error: (options: ToastOptions) => string;
  /** Push an info toast. */
  info: (options: ToastOptions) => string;
  /** Push a warning toast. */
  warning: (options: ToastOptions) => string;
  /** Triggers the exit animation and then removes the toast by id. */
  dismiss: (id: string) => void;
  /** Removes a toast immediately by id. */
  remove: (id: string) => void;
}

/** Props for the ToastProvider. */
export interface ToastProviderProps {
  /** Application tree that may call `useToast()`. */
  children?: ReactNode;
  /** Default auto-dismiss delay in ms. Defaults to `5000`. */
  duration?: number;
  /** Maximum toasts rendered at once. Defaults to `5`. */
  maxVisible?: number;
  /** Stack position. Defaults to `'bottom-right'`. */
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
