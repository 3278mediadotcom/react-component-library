/**
 * Theme-related types shared across the library.
 */

/** The set of themes the library supports out of the box. */
export type ThemeMode = 'light' | 'dark';

/** Persistence strategy for the user's theme preference. */
export type ThemeStorage = 'localStorage' | 'cookie' | 'none';

/** Shape of the theme context value provided by <ThemeProvider />. */
export interface ThemeContextValue {
  /** The currently active theme. */
  mode: ThemeMode;
  /** Switch the active theme. */
  setMode: (mode: ThemeMode) => void;
  /** Toggle between light and dark. */
  toggle: () => void;
}
