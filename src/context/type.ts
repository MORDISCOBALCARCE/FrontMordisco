export interface User{
    id_usuario: number,
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    telefono: string,
    direccion:string,
    activo: boolean,
    rol: string
}

export type CrearUser = Pick <User, 'nombre'|'apellido'|'email'|'password'|'telefono'>

export interface respCreate{
    code: number,
    messagge: string
}

export interface Payload { //mismo tipado del token que devolvemos en back
  id: number;
  email: string;
  nombre: string;
  rol: string;
}

export interface responLogin{
    code: number,
    messagge: string,
    access_token: string
    user : Payload        //lo pasamos aca porque el id de la autentificacion 
}

export interface AuthContextType{
    user: Payload | undefined,    //aca tambien 
    token: string | undefined,
    isLoading: boolean, 
    login: (email: string, pass: string) => Promise<responLogin>,
    logout: () => void
    isAuthenticate : boolean;
    error: string
    clearError: () => void
}