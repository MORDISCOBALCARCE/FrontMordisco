import type { Productos, respGet } from "../../../types/type";

const Url_Base = 'http://localhost:3000';

export async function getCatProd (nombre: string,controller : AbortController): Promise <respGet<Productos>> {
    const resp = await fetch(`${Url_Base}/productos/categoria/${nombre}`,{signal: controller.signal})
    if(!resp) throw new Error('Error de solicitud')
    const data = await resp.json()
    return data
}