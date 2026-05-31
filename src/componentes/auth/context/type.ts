export interface User{
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    rol: string
}

export interface responLogin{
    code: number,
    messagge: string,
    access_token: string
    user : User
}

export interface AuthContextType{
    user: User | undefined,
    token: string | undefined,
    isLoading: boolean, 
    login: (email: string, pass: string) => Promise<responLogin>,
    logout: () => void
    isAuthenticate : boolean;
}