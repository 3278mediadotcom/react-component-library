import { useCallback, useMemo, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { ToastContext } from './ToastContext';
import type {
  ToastApi,
  ToastItem,
  ToastOptions,
  ToastProviderProps,
  ToastVariant,
} from './Toast.types';

const EXIT_DURATION = 200;

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: 'border-green-300 bg-white dark:border-green-800 dark:bg-slate-900',
  error: 'border-red-300 bg-white dark:border-red-800 dark:bg-slate-900',
  info: 'border-sky-300 bg-white dark:border-sky-800 dark:bg-slate-900',
  warning: 'border-amber-300 bg-white dark:border-amber-800 dark:bg-slate-900',
};

const VARIANT_ICON: Record<ToastVariant, ReactNode> = {
  success: <span className="text-green-500">✓</span>,
  error: <span className="text-red-500">✕</span>,
  info: <span className="text-sky-500">ℹ</span>,
  warning: <span className="text-amber-500">⚠</span>,
};

const PLACEMENT_CLASSES: Record<NonNullable<ToastProviderProps['placement']>, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
};

/**
 * Provides the toast system to the application.
 *
 * - `useToast()` exposes `success/error/info/warning` constructors.
 * - Auto-dismiss with pause-on-hover (timers are cleared on enter and
 *   rescheduled on leave).
 * - Stacks toasts and caps the visible count.
 * - Exit animation then removal.
 */
export function ToastProvider({
  children,
  duration = 5000,
  maxVisible = 5,
  placement = 'bottom-right',
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [paused, setPaused] = useState(false);

  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const idRef = useRef(0);

  // Mirror of the current list so pause/reschedule logic runs outside
  // state updaters (React StrictMode double-invokes updaters otherwise).
  const toastsRef = useRef<ToastItem[]>([]);
  toastsRef.current = toasts;

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const scheduleDismiss = useCallback(
    (item: ToastItem, delay: number) => {
      clearTimer(item.id);
      if (delay === 0) return; // persistent toast
      const timer = setTimeout(() => {
        timersRef.current.delete(item.id);
        setToasts((prev) => prev.map((t) => (t.id === item.id ? { ...t, visible: false } : t)));

        window.setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== item.id));
        }, EXIT_DURATION);
      }, delay);
      timersRef.current.set(item.id, timer);
    },
    [clearTimer],
  );

  const push = useCallback(
    (variant: ToastVariant, options: ToastOptions) => {
      const id = `toast-${++idRef.current}`;
      const item: ToastItem = {
        id,
        variant,
        content: options.content,
        title: options.title,
        duration: options.duration ?? duration,
        visible: true,
      };

      setToasts((prev) => [...prev, item].slice(-maxVisible));

      // Side effect lives outside the state updater.
      if (item.duration > 0) {
        scheduleDismiss(item, item.duration);
      }

      return id;
    },
    [duration, maxVisible, scheduleDismiss],
  );

  const dismiss = useCallback(
    (id: string) => {
      clearTimer(id);
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)));
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, EXIT_DURATION);
    },
    [clearTimer],
  );

  const remove = useCallback(
    (id: string) => {
      clearTimer(id);
      setToasts((prev) => prev.filter((t) => t.id !== id));
    },
    [clearTimer],
  );

  // Stable API: push + dismiss/remove are memoized, so useMemo keeps its ref.
  const api = useMemo<ToastApi>(
    () => ({
      show: push,
      success: (options) => push('success', options),
      error: (options) => push('error', options),
      info: (options) => push('info', options),
      warning: (options) => push('warning', options),
      dismiss,
      remove,
    }),
    [push, dismiss, remove],
  );

  const handleMouseEnter = useCallback(() => {
    setPaused(true);
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPaused(false);
    // Reschedule remaining toasts from scratch (outside state updaters).
    toastsRef.current.forEach((t) => {
      if (t.visible && t.duration > 0) {
        scheduleDismiss(t, t.duration);
      }
    });
  }, [scheduleDismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {createPortal(
        <div
          role="status"
          aria-live="polite"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={classNames(
            'fixed z-[60] flex w-80 flex-col gap-2 outline-none',
            PLACEMENT_CLASSES[placement],
          )}
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={classNames(
                'animate-toast-in pointer-events-auto relative overflow-hidden rounded-lg border p-3 shadow-lg',
                VARIANT_STYLES[toast.variant],
                !toast.visible && 'opacity-0',
                'transition-opacity duration-200',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-0.5 shrink-0">
                    {VARIANT_ICON[toast.variant]}
                  </span>
                  <div className="min-w-0">
                    {toast.title && (
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {toast.title}
                      </p>
                    )}
                    <p className="text-sm text-slate-600 dark:text-slate-300">{toast.content}</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => dismiss(toast.id)}
                  className="shrink-0 rounded p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              </div>
              {toast.duration > 0 && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-200 dark:bg-slate-800">
                  <div
                    className={classNames('h-full bg-green-500', !toast.visible && 'w-full')}
                    style={
                      toast.visible && !paused
                        ? {
                            animation: `toast-progress ${toast.duration}ms linear forwards`,
                          }
                        : undefined
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
