import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cloneElement, isValidElement } from 'react';
import { classNames } from '../../utils/classNames';
import { useStableId } from '../../utils/ids';
import { usePortal } from '../../hooks/usePortal';
import { useFloatingPosition, type FloatingPlacement } from '../../hooks/useFloatingPosition';
import type { TooltipProps } from './Tooltip.types';

const ARROW_CLASSES: Record<FloatingPlacement, string> = {
  top: 'bottom-[-4px] left-1/2 -translate-x-1/2 rotate-45',
  bottom: 'top-[-4px] left-1/2 -translate-x-1/2 rotate-45',
  left: 'right-[-4px] top-1/2 -translate-y-1/2 rotate-45',
  right: 'left-[-4px] top-1/2 -translate-y-1/2 rotate-45',
};

/**
 * Tooltip — an accessible overlay with role="tooltip".
 *
 * - Opens on hover (after `delay`) and on keyboard focus (immediately).
 * - `aria-describedby` wires the tooltip as the descriptive text of the
 *   trigger, so screen readers announce it.
 * - The tooltip renders when `visible` (so it can be measured), stays visually
 *   hidden until `useFloatingPosition` computes its anchor, then reveals.
 */
export function Tooltip({
  children,
  content,
  placement = 'top',
  delay = 150,
  arrow = true,
  disabled = false,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const container = usePortal();
  const tooltipId = useStableId('tooltip');

  const position = useFloatingPosition({
    triggerRef,
    floatingRef: tooltipRef,
    placement,
    enabled: visible && !disabled,
  });

  const show = useCallback(() => {
    if (disabled) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
  }, [disabled, delay]);

  const showImmediately = useCallback(() => {
    if (disabled) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setVisible(true);
  }, [disabled]);

  const hide = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  if (!isValidElement(children)) return <>{children}</>;

  // Inject show/hide handlers + the accessible description reference into the
  // trigger element (a single child is required).
  const trigger = cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    ref: triggerRef,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: showImmediately,
    onBlur: hide,
    'aria-describedby': visible && position ? tooltipId : undefined,
  });

  return (
    <>
      {trigger}
      {visible &&
        !disabled &&
        container &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            style={{ top: position?.top ?? 0, left: position?.left ?? 0 }}
            className={classNames(
              'animate-pop pointer-events-none fixed z-50 max-w-xs rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-slate-100 dark:text-slate-900',
              position === null && 'invisible',
              className,
            )}
          >
            {arrow && (
              <span
                aria-hidden="true"
                className={classNames(
                  'absolute h-2 w-2 bg-slate-900 dark:bg-slate-100',
                  ARROW_CLASSES[placement],
                )}
              />
            )}
            {content}
          </div>,
          container,
        )}
    </>
  );
}

export default Tooltip;
