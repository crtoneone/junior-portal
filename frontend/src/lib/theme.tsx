'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type ThemeName = 'bauhaus2' | 'bauhaus-primar' | 'bauhaus-poster' | 'brutal' | 'brutal-dark' | 'brutal-signal';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'bauhaus2',
  setTheme: () => {},
});

const THEME_KEY = 'jp-theme';
const ALL_THEMES: ThemeName[] = ['bauhaus2', 'bauhaus-primar', 'bauhaus-poster', 'brutal', 'brutal-dark', 'brutal-signal'];

export function ThemeProvider({
  children,
  initialTheme = 'bauhaus2',
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