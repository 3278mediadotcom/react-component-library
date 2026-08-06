import { useContext } from 'react';
import { ThemeContext, DEFAULT_THEME_CONTEXT } from '../contexts/ThemeContext';

/**
 * Returns the current theme context.
 *
 * Falls back to a no-op default when no <ThemeProvider /> is mounted so
 * components built before the provider exists never crash.
 *
 * @example
 * const { mode, toggle } = useTheme();
 */
export function useTheme() {
  return useContext(ThemeContext) ?? DEFAULT_THEME_CONTEXT;
}

export default useTheme;
