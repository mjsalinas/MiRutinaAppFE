import React, { createContext, useContext, useState } from "react";

type Language = "en" | "es" | "fr";

interface LanguageContextProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const translations: Record<Language, Record<string, string>> = {
  en: { 
    signIn: "Sign in", 
    signUp: "Sign up", 
    forgotPassword: "Forgot my password", 
    welcomeText: "Welcome",
    invalidEmail: "Invalid email",
    passwordMustBeStronger: "Password must be stronger"
  },
  es: { 
    signIn: "Iniciar sesión", 
    signUp: "Registrarse", 
    forgotPassword: "Olvidé mi contraseña", 
    welcomeText: "Bienvenido",
    invalidEmail: "Correo inválido",
    passwordMustBeStronger: "La contraseña debe ser más fuerte"
  },
  fr: { 
    signIn: "Se connecter", 
    signUp: "S'inscrire", 
    forgotPassword: "Mot de passe oublié", 
    welcomeText: "Bienvenue",
    invalidEmail: "Email invalide",
    passwordMustBeStronger: "Le mot de passe doit être plus fort"
  },
};

export const i18n = {
  t: (key: string) => translations["es"][key] ?? key
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("es");

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.t = (key: string) => translations[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  return context;
};
