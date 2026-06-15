export type Theme = 'light' | 'dark'

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
    message: string,
}
export interface respGet<T>{
    code: number,
    messagge: string,
    data : T[] 
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

export type FetchState<T> =
    |{status: 'idle'}
    |{status: 'loading'}
    |{status: 'success', data: T }
    |{status: 'error'}

    export interface Productos{
        // id: number,
        nombre: string,
        precio: number,
        descripcion: string,
        imagen: File | null,
        // categoria? : number,
        // local_id? : number,

    }