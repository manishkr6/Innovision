import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext({
  isDark: true,
});

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Lock to futuristic dark cyber fest theme
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    localStorage.removeItem('innovision_theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
