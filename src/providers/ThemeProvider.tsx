import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import type { ThemeMode } from '../types/theme';

const STORAGE_KEY = 'rc-library-theme';

const getInitialMode = (storageKey: string, fallback: ThemeMode): ThemeMode => {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // localStorage unavailable (private mode, SSR): fall through to default
  }
  return fallback;
};

export interface ThemeProviderProps {
  /** Application tree that should receive theme context. */
  children: ReactNode;
  /** Initial theme. Defaults to system preference, then 'light'. */
  initialMode?: ThemeMode;
  /** localStorage key used to persist the preference. */
  storageKey?: string;
}

/**
 * Provides theme state to the application and persists the
 * user's selection to localStorage.
 *
 * Applies the active theme by toggling the `dark` class on
 * <html>, which Tailwind's class-based dark variant responds to.
 */
export function ThemeProvider({
  children,
  initialMode = 'light',
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => getInitialMode(storageKey, initialMode));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    root.style.colorScheme = mode;
  }, [mode]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // Persistence is best-effort; the in-memory value still applies.
      }
    },
    [storageKey],
  );

  const toggle = useCallback(() => {
    setModeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // ignore storage failures
      }
      return next;
    });
  }, [storageKey]);

  const value = useMemo(() => ({ mode, setMode, toggle }), [mode, setMode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
