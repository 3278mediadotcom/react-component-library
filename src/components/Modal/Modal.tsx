import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../utils/classNames';
import { useStableId } from '../../utils/ids';
import { useControllableState } from '../../hooks/useControllableState';
import { usePortal } from '../../hooks/usePortal';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useScrollLock } from '../../hooks/useScrollLock';
import { trapFocus } from '../../utils/focus';
import type { ModalProps } from './Modal.types';

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

/**
 * Modal — an accessible dialog rendered in a portal.
 *
 * Implements the WAI-ARIA dialog pattern:
 * - Portal + `role="dialog"` + `aria-modal="true"`
 * - Focus trap (Tab/Shift+Tab stay inside)
 * - Focus moves to the dialog on open and is restored to the trigger on close
 * - ESC + backdrop + close button dismiss
 * - Body scroll lock while open
 */
export function Modal({
  open,
  defaultOpen = false,
  onClose,
  children,
  title,
  description,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  closeLabel = 'Close dialog',
  lockScroll = true,
  className,
  size = 'md',
}: ModalProps) {
  const baseId = useStableId('modal');
  const titleId = title ? `${baseId}-title` : undefined;
  const descriptionId = description ? `${baseId}-description` : undefined;

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: (next) => {
      if (!next) onClose?.();
    },
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);

  const container = usePortal(`${baseId}-container`);

  // Remember the element that had focus before the dialog opened.
  useEffect(() => {
    if (isOpen) {
      setTriggerRef(document.activeElement as HTMLElement | null);
    }
  }, [isOpen]);

  // Move focus into the dialog when it opens.
  // Depends on `container` so it re-runs once the portal mounts the panel.
  useEffect(() => {
    if (!isOpen || !container) return;
    // Focus the first focusable element (or the panel itself if none).
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    (focusable ?? panel).focus();
  }, [isOpen, container]);

  // Trap Tab focus inside the dialog.
  useEffect(() => {
    if (!isOpen || !container) return;
    const panel = panelRef.current;
    if (!panel) return;
    return trapFocus(panel);
  }, [isOpen, container]);

  // Restore focus to the trigger element when the dialog closes.
  useEffect(() => {
    if (!isOpen && triggerRef) {
      triggerRef.focus?.();
    }
  }, [isOpen, triggerRef]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEscapeKey(() => close(), isOpen && closeOnEscape);
  useScrollLock(isOpen && lockScroll);

  if (!isOpen || !container) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      close();
    }
  };

  return createPortal(
    <div
      className={classNames('fixed inset-0 z-50 flex items-center justify-center p-4', className)}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={handleBackdropClick}
        className="animate-overlay-in absolute inset-0 bg-slate-950/60"
      />

      {/* Dialog panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={classNames(
          'animate-modal-in relative flex max-h-[90vh] w-full flex-col rounded-xl bg-white shadow-2xl dark:bg-slate-900',
          SIZE_CLASSES[size],
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            {title && (
              <h2 id={titleId} className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                aria-label={closeLabel}
                onClick={close}
                className={classNames(
                  '-mr-1 rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
                  'dark:hover:bg-slate-800 dark:hover:text-slate-200',
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {description && (
          <p id={descriptionId} className="px-6 pt-4 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}

        <div className="overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>,
    container,
  );
}

export default Modal;
