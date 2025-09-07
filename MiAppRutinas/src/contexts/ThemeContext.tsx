import { createContext, useContext, useState, useEffect } from "react";
import type { ColorSchemeName } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

// 1. Define los tipos para el tema y el contexto
type Theme = "light" | "dark" | "auto";
type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  changeTheme: (newTheme: Theme) => void;
};

// 2. Crea el contexto
const ThemeContext = createContext<ThemeContextType | null>(null);

// 3. Define el ThemeProvider
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("auto");
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName | null>(Appearance.getColorScheme());

  const isDark =
    theme === "dark" || (theme === "auto" && systemScheme === "dark");

  // Guarda el tema en AsyncStorage y en el estado
  const saveTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
      setTheme(newTheme);
      console.log("Theme guardado:", newTheme);
    } catch (error) {
      console.error("Error al guardar el tema:", error);
    }
  };

  // Carga el tema desde AsyncStorage al iniciar
  useEffect(() => {
    let mounted = true;
    const loadTheme = async () => {
      try {
        const storedTheme = (await AsyncStorage.getItem("theme")) as Theme | null;
        if (mounted) {
          if (storedTheme) {
            setTheme(storedTheme);
            console.log("Theme cargado desde AsyncStorage:", storedTheme);
          } else {
            console.log("No hay theme guardado, usando 'auto'.");
          }
        }
      } catch (error) {
        console.error("Error al cargar el tema:", error);
      }
    };
    loadTheme();

    // Escucha cambios del sistema (modo claro/oscuro)
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme ?? null);
      console.log("Appearance cambiado:", colorScheme);
    });

    return () => {
      mounted = false;
      // @ts-ignore - remove listener si existe
      if (sub && typeof sub.remove === "function") sub.remove();
    };
  }, []);

  const changeTheme = (newTheme: Theme) => {
    saveTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Crea el hook useTheme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
};