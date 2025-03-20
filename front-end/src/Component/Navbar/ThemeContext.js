import React, { createContext, useState, useEffect } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default theme is dark

  // Get the stored theme from localStorage, if it exists
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Save the default theme to localStorage if it doesn't exist
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
