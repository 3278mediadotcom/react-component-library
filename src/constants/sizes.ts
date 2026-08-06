/**
 * Size tokens for components.
 *
 * Mirrors the Tailwind spacing scale so components stay
 * consistent with the design system.
 */

export const SIZES = {
  sm: {
    height: '2rem', // h-8
    paddingX: '0.75rem', // px-3
    paddingY: '0.375rem', // py-1.5
    fontSize: '0.875rem', // text-sm
  },
  md: {
    height: '2.5rem', // h-10
    paddingX: '1rem', // px-4
    paddingY: '0.5rem', // py-2
    fontSize: '0.95rem', // text-[0.95rem]
  },
  lg: {
    height: '3rem', // h-12
    paddingX: '1.25rem', // px-5
    paddingY: '0.625rem', // py-2.5
    fontSize: '1.0625rem', // text-[1.0625rem]
  },
} as const;

export type SizeToken = keyof typeof SIZES;
