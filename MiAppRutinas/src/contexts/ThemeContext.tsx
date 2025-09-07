import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextProps {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (
        savedTheme === 'light' ||
        savedTheme === 'dark' ||
        savedTheme === 'auto'
      ) {
        setThemeState(savedTheme);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const checkDark = () => {
      if (theme === 'auto') {
        // Puedes usar Appearance si quieres detectar el sistema
        setIsDark(false); // Cambia esto si implementas detección automática
      } else {
        setIsDark(theme === 'dark');
      }
    };
    checkDark();
    AsyncStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  return (
    <ThemeContext.Provider value={{theme, isDark, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return context;
};
