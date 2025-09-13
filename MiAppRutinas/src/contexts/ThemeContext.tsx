import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos para el tema
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  shadow: string;
}

export interface Theme {
  colors: ThemeColors;
  isDark: boolean;
}

// Definición de colores para tema claro
const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: '#F5F5F5',
    surface: '#FFFFFF',
    primary: '#007AFF',
    secondary: '#5856D6',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    card: '#FFFFFF',
    shadow: '#000000',
  },
};

// Definición de colores para tema oscuro
const darkTheme: Theme = {
  isDark: true,
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#333333',
    card: '#2C2C2E',
    shadow: '#000000',
  },
};

// Contexto del tema
interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider del tema
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  const [theme, setTheme] = useState<Theme>(lightTheme);

  // Función para obtener el tema actual basado en el modo
  const getCurrentTheme = (mode: ThemeMode): Theme => {
    if (mode === 'auto') {
      // En modo auto, usar tema claro por defecto (en una app real detectarías el tema del sistema)
      return lightTheme;
    }
    return mode === 'dark' ? darkTheme : lightTheme;
  };

  // Cargar tema guardado al iniciar
  useEffect(() => {
    loadTheme();
  }, []);

  // Actualizar tema cuando cambia el modo
  useEffect(() => {
    const currentTheme = getCurrentTheme(themeMode);
    setTheme(currentTheme);
  }, [themeMode]);

  // Función para cargar el tema guardado
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode');
      if (savedTheme) {
        const themeModeValue = savedTheme as ThemeMode;
        setThemeModeState(themeModeValue);
        console.log('Tema cargado:', themeModeValue);
      } else {
        console.log('No hay tema guardado, usando tema por defecto');
      }
    } catch (error) {
      console.error('Error al cargar el tema:', error);
    }
  };

  // Función para cambiar el modo del tema
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem('themeMode', mode);
      console.log('Tema guardado:', mode);
    } catch (error) {
      console.error('Error al guardar el tema:', error);
    }
  };

  // Función para alternar entre claro y oscuro
  const toggleTheme = () => {
    const newMode = theme.isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  const value: ThemeContextType = {
    theme,
    themeMode,
    setThemeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el tema
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

// Exportar los temas para uso directo si es necesario
export { lightTheme, darkTheme };
