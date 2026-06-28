export type Theme = 'light' | 'dark'

export interface User{
    id_usuario: number,
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    telefono: string,
    direccion:string,
    rol: string
    activo: boolean;
}

export interface Local{
    id_local:number,
    nombre_comercial: string,
    tipoLocal: string,
    activo: boolean,
    direccion: string,
    horario_apertura: string,
    horario_cierre: string,
    description:string;
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
    |{status: 'error', error: string}

    export interface Productos{
        id_producto: number,
        nombre: string,
        activo: boolean,
        precio: number,
        descripcion: string,
        imagen: File | null,
        categoria? : {
            nombre:string
        },
        // local_id? : number,
        tiempo_preparacion: number,

    }
