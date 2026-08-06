import { useContext } from 'react';
import { ToastContext } from './ToastContext';
import type { ToastApi } from './Toast.types';

/**
 * Returns the toast API exposed by `<ToastProvider />`.
 *
 * @example
 * const toast = useToast();
 * toast.success({ title: 'Saved', content: 'Your changes are saved.' });
 */
export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) {
    throw new Error('useToast must be used within a <ToastProvider>.');
  }
  return api;
}

export default useToast;
