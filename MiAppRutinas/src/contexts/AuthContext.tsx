import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmail, signOut } from "../config/firebase";

type User = {
    email: string,
    uid: string,
} | null;

const AuthContext = createContext<{
    user: User,
    isAllowed: Boolean,
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>,
    logout: () => Promise<void>,
    loading: boolean,
} | null> (null); 

//medio para exponer la manipulacion de estado a la aplicacion o componentes hijos
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User>(null);
    const [isAllowed, setIsAllowed] = useState<Boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // Escuchar cambios en el estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    email: firebaseUser.email || '',
                    uid: firebaseUser.uid
                });
                setIsAllowed(true);
            } else {
                setUser(null);
                setIsAllowed(false);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const result = await signInWithEmail(email, password);
            
            if (result.success) {
                console.log('Login exitoso en AuthContext');
                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error: any) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut();
            setUser(null);
            setIsAllowed(false);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <AuthContext.Provider value={{user, isAllowed, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

//hook para utilizar el contexto en componentes personalizados (e.g login, home)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
}