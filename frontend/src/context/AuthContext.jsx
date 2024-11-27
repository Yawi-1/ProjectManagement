import { createContext, useContext, useEffect, useState } from "react";
import { useProject } from "./ProjectContext";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(localStorage.getItem('auth-token'));
    const { url } = useProject();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        setAdmin(token);
    }, [url])

    // Logout the admin.......
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('auth-token');
        setAdmin(null);
        navigate('/');
    }
    return (
        <AuthContext.Provider value={{ admin, setAdmin, logout, }}>
            {children}
        </AuthContext.Provider>
    )
}