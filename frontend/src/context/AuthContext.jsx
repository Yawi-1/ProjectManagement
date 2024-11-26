import { createContext, useContext, useEffect, useState } from "react";
import { useProject } from "./ProjectContext";

const AuthContext = createContext();

export const useAuth =()=>{
    return useContext(AuthContext);
}

export const AuthProvider =({children})=>{
    const [admin,setAdmin] = useState(localStorage.getItem('auth-token'));
    const {url} = useProject();

    useEffect(()=>{
        const token = localStorage.getItem('auth-token');
        setAdmin(token);
    },[url])

    return(
        <AuthContext.Provider value={{admin}}>
            {children}
        </AuthContext.Provider>
    )
}