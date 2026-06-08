export interface User{
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    telefono: string,
    direccion:string,
    rol: string
}

export type CrearUser = Pick <User, 'nombre'|'apellido'|'email'|'password'|'telefono'>

export interface respCreate{
    code: number,
    messagge: string
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
    error: string
}