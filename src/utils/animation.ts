/**
 * Shared transition timing for overlay components.
 *
 * Keeping these in one place makes Modal, Drawer, Tooltip, and Popover feel
 * consistent and lets consumers tune the system from a single source.
 */

export const OVERLAY_DURATION = 200;

export const TRANSITION_DURATION_FAST = 150;
export const TRANSITION_DURATION_MEDIUM = 200;

/** Common easing for overlay entrances/exits. */
export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const EASE_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)';

/** Standard transform for floating elements when they anchor to bottom. */
export const FLOATING_BOTTOM_STYLE = {
  transformOrigin: 'top',
} as const;
