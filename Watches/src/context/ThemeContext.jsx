import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [brightMode, setBrightMode] = useState(() => {
    const saved = localStorage.getItem('luxewatch-bright-mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('luxewatch-bright-mode', brightMode);
    document.documentElement.setAttribute('data-bright', brightMode ? 'true' : 'false');
  }, [brightMode]);

  const toggleBrightMode = useCallback(() => {
    setBrightMode(prev => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ brightMode, toggleBrightMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

