import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark" | "auto";

interface ThemeContextProps {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
  colors: {
    background: string;
    card: string;
    text: string;
    inputBackground: string;
    inputText: string;
    buttonPrimary: string;
    buttonSecondary: string;
    buttonText: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>("auto");

  const setTheme = async (mode: ThemeMode) => {
    setThemeState(mode);
    await AsyncStorage.setItem("appTheme", mode);
  };

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("appTheme");
      if (savedTheme) {
        setThemeState(savedTheme as ThemeMode);
        console.log("🌙 Tema cargado:", savedTheme);
      }
    } catch (err) {
      console.error("❌ Error al cargar el tema:", err);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const colorScheme = Appearance.getColorScheme();
  const isDark = theme === "dark" || (theme === "auto" && colorScheme === "dark");

  const colors = {
    background: isDark ? "#121212" : "#F2F2F2",
    card: isDark ? "#1E1E2C" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#000000",
    inputBackground: isDark ? "#2C2C3E" : "#f9f9f9",
    inputText: isDark ? "#FFFFFF" : "#000000",
    buttonPrimary: isDark ? "#1c1c30" : "#007AFF",
    buttonSecondary: isDark ? "#65659c" : "#6C63FF",
    buttonText: "#FFFFFF",
    border: isDark ? "#555" : "#ccc",
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
};