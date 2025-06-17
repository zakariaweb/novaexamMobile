// contexts/DarkModeContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DARK_MODE_KEY = '@dark_mode_enabled';

export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const savedMode = await AsyncStorage.getItem(DARK_MODE_KEY);
        if (savedMode !== null) {
          setIsDarkMode(savedMode === 'true');
        }
      } catch (e) {
        console.error('Failed to load dark mode setting:', e);
      }
    })();
  }, []);

  const toggleDarkMode = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem(DARK_MODE_KEY, newValue.toString());
    } catch (e) {
      console.error('Failed to save dark mode setting:', e);
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
