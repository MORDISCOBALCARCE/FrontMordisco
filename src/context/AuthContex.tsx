import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, responLogin, User } from "./type";


export const Url_Base = 'http://localhost:3000';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface props {
    children: ReactNode;
}

export function ContextProvider({ children }: props) {
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string>();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const savedToken = window.localStorage.getItem('token');
        // const savedUser = window.localStorage.getItem('user');

        if (savedToken) {
            setToken(savedToken)
        }

        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true)
            const resp = await fetch(`${Url_Base}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password})
            });
            if (!resp.ok) {
                throw new Error('Credenciales incorrectas');

            } else {
                const data: responLogin = await resp.json()
                setToken(data.access_token)
                setUser(data.user)
                setIsLoading(false)
                window.localStorage.setItem('token', data.access_token)
                // console.log(data) //esto trae data del user
                return data
            }

        } catch (error) {
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    }
    const logout = () => {
        setToken(undefined);
        window.localStorage.removeItem('token')
    }

    const isAuthenticate = !!token 

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading, isAuthenticate }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un ContextProvider');
    }
    return context
}

