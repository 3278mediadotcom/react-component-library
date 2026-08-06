import { useCallback, useEffect, useRef, useState, isValidElement, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../utils/classNames';
import { useStableId } from '../../utils/ids';
import { usePortal } from '../../hooks/usePortal';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useFloatingPosition } from '../../hooks/useFloatingPosition';
import type { PopoverProps } from './Popover.types';

/**
 * Popover — a positioned overlay that can hold arbitrary content
 * (menus, forms, profile cards).
 *
 * - Toggles on trigger click
 * - Closes on outside click and Escape
 * - Positioned by `useFloatingPosition` (re-anchors on scroll/resize)
 * - Rendered in a portal with `role="dialog"` semantics
 */
export function Popover({
  children,
  content,
  placement = 'bottom',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  closeOnItemClick = false,
  className,
  ...rest
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const container = usePortal();
  const panelId = useStableId('popover');

  const accessibleLabel = rest['aria-label'] ?? 'Popover';

  const position = useFloatingPosition({
    triggerRef,
    floatingRef: panelRef,
    placement,
    enabled: open,
  });

  // Move focus into the popover panel when it opens.
  useEffect(() => {
    if (!open || !container) return;
    const panel = panelRef.current;
    if (!panel) return;
    panel.focus();
  }, [open, container]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEscapeKey(close, open && closeOnEscape);
  useClickOutside(triggerRef, close, open && closeOnOutsideClick);

  if (!isValidElement(children)) return <>{children}</>;

  const trigger = cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    ref: triggerRef,
    onClick: toggle,
    'aria-expanded': open,
    'aria-haspopup': 'dialog',
    'aria-controls': open ? panelId : undefined,
  });

  return (
    <>
      {trigger}
      {open &&
        container &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-label={accessibleLabel}
            tabIndex={-1}
            style={{ top: position?.top ?? 0, left: position?.left ?? 0 }}
            className={classNames(
              'animate-pop absolute z-50 rounded-lg border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900',
              'focus:outline-none',
              position === null && 'invisible',
              className,
            )}
            onClick={(event) => {
              if (closeOnItemClick) {
                const target = event.target as HTMLElement;
                if (target.closest('button, a, [role="menuitem"]')) {
                  close();
                }
              }
            }}
          >
            {content}
          </div>,
          container,
        )}
    </>
  );
}

export default Popover;
