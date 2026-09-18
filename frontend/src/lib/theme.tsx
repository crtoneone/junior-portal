'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type ThemeName =
  | 'bauhaus2' | 'bauhaus-primar' | 'bauhaus-poster'
  | 'brutal' | 'brutal-dark' | 'brutal-signal'
  | 'acid' | 'acid-paper'
  | 'vivid-split' | 'vivid-poster'
  | 'swiss' | 'swiss-arc';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

const DEFAULT_THEME: ThemeName = 'brutal-signal';
const THEME_KEY = 'jp-theme';
const ALL_THEMES: ThemeName[] = [
  'brutal-signal', 'brutal', 'brutal-dark',
  'bauhaus2', 'bauhaus-primar', 'bauhaus-poster',
  'acid', 'acid-paper', 'vivid-split', 'vivid-poster', 'swiss', 'swiss-arc',
];

const ThemeContext = createContext<ThemeContextType>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  initialTheme = DEFAULT_THEME,
}: {
  children: React.ReactNode;
  initialTheme?: ThemeName;
}) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === 'undefined') return initialTheme;
    try {
      const stored = localStorage.getItem(THEME_KEY) as ThemeName | null;
      if (stored && ALL_THEMES.includes(stored)) return stored;
    } catch {}
    return initialTheme;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  const setTheme = useCallback((t: ThemeName) => setThemeState(t), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}