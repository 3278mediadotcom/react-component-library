import { useCallback, useLayoutEffect, useState } from 'react';

export type FloatingPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface FloatingPosition {
  top: number;
  left: number;
}

const GAP = 8;

function computePosition(
  trigger: HTMLElement,
  floating: HTMLElement,
  placement: FloatingPlacement,
  gap: number,
): FloatingPosition {
  const triggerRect = trigger.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  const { scrollY, scrollX } = window;

  const positions: Record<FloatingPlacement, FloatingPosition> = {
    top: {
      top: triggerRect.top + scrollY - floatingRect.height - gap,
      left: triggerRect.left + scrollX + (triggerRect.width - floatingRect.width) / 2,
    },
    bottom: {
      top: triggerRect.bottom + scrollY + gap,
      left: triggerRect.left + scrollX + (triggerRect.width - floatingRect.width) / 2,
    },
    left: {
      top: triggerRect.top + scrollY + (triggerRect.height - floatingRect.height) / 2,
      left: triggerRect.left + scrollX - floatingRect.width - gap,
    },
    right: {
      top: triggerRect.top + scrollY + (triggerRect.height - floatingRect.height) / 2,
      left: triggerRect.right + scrollX + gap,
    },
  };

  return positions[placement];
}

/**
 * Positions a floating element (tooltip/popover) relative to a trigger.
 *
 * - Recomputes on scroll/resize so the overlay stays anchored.
 * - Returns `null` until the first measurement (SSR-safe).
 * - Disabled while the floating element is hidden.
 */
export function useFloatingPosition({
  triggerRef,
  floatingRef,
  placement = 'bottom',
  gap = GAP,
  enabled = false,
}: {
  triggerRef: React.RefObject<HTMLElement | null>;
  floatingRef: React.RefObject<HTMLElement | null>;
  placement?: FloatingPlacement;
  gap?: number;
  enabled?: boolean;
}): FloatingPosition | null {
  const [position, setPosition] = useState<FloatingPosition | null>(null);

  const update = useCallback(() => {
    const trigger = triggerRef.current;
    const floating = floatingRef.current;
    if (!trigger || !floating) return;
    setPosition(computePosition(trigger, floating, placement, gap));
  }, [triggerRef, floatingRef, placement, gap]);

  useLayoutEffect(() => {
    if (!enabled) {
      setPosition(null);
      return;
    }

    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [enabled, update]);

  return position;
}

export default useFloatingPosition;
