/**
 * Central color tokens.
 *
 * Values map to the Tailwind theme; keeping them here gives
 * components a single source of truth for semantic colors.
 */

export const COLORS = {
  primary: '#3b82f6', // blue-500
  primaryHover: '#2563eb', // blue-600
  secondary: '#64748b', // slate-500
  secondaryHover: '#475569', // slate-600
  danger: '#ef4444', // red-500
  dangerHover: '#dc2626', // red-600
  success: '#22c55e', // green-500
  warning: '#f59e0b', // amber-500
  info: '#0ea5e9', // sky-500
  neutral: '#6b7280', // gray-500
  text: '#0f172a', // slate-900
  textMuted: '#64748b', // slate-500
  border: '#e2e8f0', // slate-200
  background: '#ffffff',
  backgroundAlt: '#f8fafc', // slate-50
} as const;

export type ColorToken = keyof typeof COLORS;
