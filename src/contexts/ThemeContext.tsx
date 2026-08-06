import { createContext } from 'react';
import type { ThemeContextValue, ThemeMode } from '../types/theme';

/**
 * React context for theme state.
 *
 * Components read `useTheme()` instead of consuming this context directly;
 * keep that convention so swapping the implementation is a one-line change.
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/** Default no-op implementation used before a ThemeProvider is mounted. */
export const DEFAULT_THEME_CONTEXT: ThemeContextValue = {
  mode: 'light',
  setMode: () => undefined,
  toggle: () => undefined,
};

export type { ThemeMode };
