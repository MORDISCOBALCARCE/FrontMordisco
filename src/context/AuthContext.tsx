import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// 1. Definir interfaces
interface User {
  id: number;
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  role: string | null;
  login: (username: string, password: string) => Promise<Response>;
  logout: () => void;
  isAuthenticated: boolean;
}

// 1. Crear el contexto
const AuthContext = createContext <AuthContextType | null>(null);

// 2. Provider - envuelve toda la app
export function AuthProvider({ children }: { children: ReactNode }) {
  //declaramos los estados user,token,loading
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  // Al montar el componente, revisa si hay sesión guardada en localstorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);

  }, []);

  // Función de login - llama a la API
  const login = async (nombre: string, password: string) => {
    //hacemos la peticion a la api
    const response = await fetch('http://localhost:3000/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, password })
    })

    // Guardar en estado y localStorage
    if (!response.ok) {
      console.error("Login fallido", response.statusText)
    } else {
      const data = await response.json();
      setToken(data.access_token);
      setUser(data.user);
      setRole(data.user.role)
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    //retorna los datos de la respuesta
    return response
  };

  // Función de logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Verificar si está autenticado
  const isAuthenticated = !!token && !!user;

  const value: AuthContextType = {
    user,
    token,
    loading,
    role,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Hook personalizado para consumir el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
