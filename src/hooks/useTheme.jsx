import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const THEMES = [
  { id: 'default', name: 'Electric', accent: '#6366f1', glow: 'rgba(99, 102, 241, 0.4)' },
  { id: 'matrix', name: 'Matrix', accent: '#00ff66', glow: 'rgba(0, 255, 102, 0.4)' },
  { id: 'dracula', name: 'Dracula', accent: '#bd93f9', glow: 'rgba(189, 147, 249, 0.4)' },
  { id: 'cyberpunk', name: 'Cyberpunk', accent: '#ff007f', glow: 'rgba(255, 0, 127, 0.4)' },
];

const STORAGE_KEY = 'darshan-portfolio-theme';

const ThemeContext = createContext({
  theme: 'default',
  setTheme: () => {},
  cycleTheme: () => {},
  themes: THEMES,
});

/**
 * ThemeProvider component to manage and synchronize theme state across localStorage and HTML data-theme attribute.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'default';
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'default';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'default') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    if (THEMES.some((t) => t.id === newTheme)) {
      setThemeState(newTheme);
    }
  };

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setThemeState(THEMES[nextIndex].id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to access theme state and switcher.
 * @returns {{ theme: string, setTheme: (theme: string) => void, cycleTheme: () => void, themes: Array }}
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

