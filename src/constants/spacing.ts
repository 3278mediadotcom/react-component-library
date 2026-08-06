/**
 * Spacing tokens used by layout and surface components.
 *
 * Mirrors the Tailwind spacing scale so gaps and paddings
 * remain consistent across the design system.
 */

export const SPACING = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
} as const;

export type SpacingToken = keyof typeof SPACING;
