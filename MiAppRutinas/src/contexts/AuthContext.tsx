import { createContext, useContext, useState } from "react";


type User={
    email:string,
} | null;

const AuthContext= createContext<{
    user:User,
    isAllowed:boolean,
    Login:(email: string)=>void,
    logout:()=>void,
    
} | null>(null);

//Medio para exponer la manipulacion de estado a la aplicacion o componentes hijos
export const AuthProvider=({children}:{children: React.ReactNode})=>{
    const[user, setUser]=useState<User>(null);
    const[isAllowed, setisAllowed]=useState<boolean>(false);

    const Login=(email: string)=>{ 
        console.log(user);
        setUser({email});
        setisAllowed(true);
    
}
const logout=()=>{
    setUser(null);
    setisAllowed(false);
}
return (
    <AuthContext.Provider value={{user, isAllowed, Login, logout }}>
        {children}
    </AuthContext.Provider>
)
}

//Hook para utilizar el contexto en componentes personalizados (Login, Home)
export const useAuth=()=>{
    const context=useContext(AuthContext);
    if (!context) throw new Error("useAuth debe de usarse dentro de AutheProvider");
    return context;
}