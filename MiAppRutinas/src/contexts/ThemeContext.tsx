import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

export type ThemeMode = "light" | "dark" | "auto";

export type Theme = {
  mode: ThemeMode;
  colors: {
    background: string;
    text: string;
    card: string;
    button: string;
    buttonText: string;
  };
};

const lightTheme: Theme = {
  mode: "light",
  colors: {
    background: "#FFFFFF",
    text: "#222222",
    card: "#F9F9F9",
    button: "#1c1c30",
    buttonText: "#ededf7",
  },
};

const darkTheme: Theme = {
  mode: "dark",
  colors: {
    background: "#1E1E2C",
    text: "#FFFFFF",
    card: "#23233A",
    button: "#65659c",
    buttonText: "#ededf7",
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
} | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const storedMode = await AsyncStorage.getItem("themeMode");
      let initialMode: ThemeMode = storedMode as ThemeMode || "auto";
      setModeState(initialMode);
      applyTheme(initialMode);
      console.log("Tema cargado:", initialMode);
    };
    loadTheme();
  }, []);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const applyTheme = (mode: ThemeMode) => {
    let resolvedMode = mode;
    if (mode === "auto") {
      resolvedMode = Appearance.getColorScheme() === "dark" ? "dark" : "light";
    }
    setTheme(resolvedMode === "dark" ? darkTheme : lightTheme);
  };

  const setMode = async (newMode: ThemeMode) => {
    setModeState(newMode);
    await AsyncStorage.setItem("themeMode", newMode);
    applyTheme(newMode);
    console.log("Tema guardado:", newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return context;
};
