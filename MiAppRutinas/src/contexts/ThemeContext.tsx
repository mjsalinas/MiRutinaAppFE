
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark" | "auto";

const ThemeContext = createContext<{
    theme: Theme,
    changeTheme: (theme: Theme) => void,
} | null> (null);

export const ThemeProvider = ({children}: {children: React.ReactNode})=> {
    const [theme, setTheme] = useState<Theme>("auto");

    useEffect(()=> {
        const loadTheme = async () => {
            console.log("Loading theme...");
            const storedTheme = await AsyncStorage.getItem("theme");
            if (storedTheme) {
                setTheme(storedTheme as Theme);
                console.log("Theme loaded: " + storedTheme);
            }
        }
        loadTheme();
    },[])

    const changeTheme = async (theme: Theme) => {
        setTheme(theme);
        await AsyncStorage.setItem("theme", theme);
    };

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");

    const { theme, changeTheme } = context;
    const colorScheme = Appearance.getColorScheme();

    if (theme === 'auto') {
        return { ...context, theme: colorScheme, isDark: colorScheme === 'dark' };
    }

    return { ...context, isDark: theme === 'dark' };
}
