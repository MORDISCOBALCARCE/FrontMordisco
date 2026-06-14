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
    const [error, setError] = useState<string>('')


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
                setError('Credenciales incorrectas o el usuario no existe');
                throw new Error('Credenciales incorrectas');
                

            } else {
                const data: responLogin = await resp.json()
                setToken(data.access_token)
                setUser(data.user)
                setIsLoading(false)
                window.localStorage.setItem('token', data.access_token)
                // console.log(data) //esto trae data del user
                setError('');
                return data
            }

        } catch (error) {
            setError('Credenciales incorrectas o error de conexión');
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

    const clearError = () => {
        setError('');
    };

    const isAuthenticate = !!token 

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading, isAuthenticate, error, clearError }}>
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


//Funciones para recuperar la contraseña de usuario.
//Olvidó la clave
export async function forgotPassword(email: string) {
  const response = await fetch(`${Url_Base}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error");
  }

  return data;
}



//REsetear la clave
export async function resetPassword(
  token: string,
  code: string,
  password: string
) 
{
  const response = await fetch(`${Url_Base}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      code,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error");
  }

  return data;
}