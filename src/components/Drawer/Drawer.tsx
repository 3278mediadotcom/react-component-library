import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../utils/classNames';
import { useStableId } from '../../utils/ids';
import { useControllableState } from '../../hooks/useControllableState';
import { usePortal } from '../../hooks/usePortal';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useScrollLock } from '../../hooks/useScrollLock';
import { trapFocus } from '../../utils/focus';
import type { DrawerPlacement, DrawerProps } from './Drawer.types';

const PLACEMENT_CLASSES: Record<DrawerPlacement, string> = {
  left: 'inset-y-0 left-0 border-r',
  right: 'inset-y-0 right-0 border-l',
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t',
};

const ANIMATION_FOR_PLACEMENT: Record<DrawerPlacement, string> = {
  left: 'animate-drawer-in-left',
  right: 'animate-drawer-in-right',
  top: 'animate-drawer-in-top',
  bottom: 'animate-drawer-in-bottom',
};

/**
 * Drawer — a slide-in panel from any edge, sharing Modal's overlay
 * infrastructure (portal, focus trap, Escape, backdrop, scroll lock).
 */
export function Drawer({
  open,
  defaultOpen = false,
  onClose,
  children,
  title,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  closeLabel = 'Close drawer',
  lockScroll = true,
  placement = 'right',
  width = 'w-80',
  height = 'h-64',
  className,
}: DrawerProps) {
  const baseId = useStableId('drawer');
  const titleId = title ? `${baseId}-title` : undefined;

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

  // Capture the original focus target before opening.
  useEffect(() => {
    if (isOpen) {
      setTriggerRef(document.activeElement as HTMLElement | null);
    }
  }, [isOpen]);

  // Focus and trap once the portal mounts the panel.
  useEffect(() => {
    if (!isOpen || !container) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    (focusable ?? panel).focus();
    return trapFocus(panel);
  }, [isOpen, container]);

  // Restore focus on close.
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

  const isHorizontal = placement === 'left' || placement === 'right';

  return createPortal(
    <div className={classNames('fixed inset-0 z-50', className)} role="presentation">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => {
          if (closeOnBackdrop) close();
        }}
        className="animate-overlay-in absolute inset-0 bg-slate-950/60"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={classNames(
          'absolute flex flex-col bg-white shadow-2xl dark:bg-slate-900',
          isHorizontal ? width : `${height} w-full`,
          PLACEMENT_CLASSES[placement],
          ANIMATION_FOR_PLACEMENT[placement],
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
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
                className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
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
        <div className="overflow-y-auto p-5">{children}</div>
      </div>
    </div>,
    container,
  );
}

export default Drawer;
