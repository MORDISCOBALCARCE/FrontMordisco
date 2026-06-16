
import type { Productos, respCreate, respGet, User } from '../types/type';

const Url_Base = 'http://localhost:3000';

export async function getUser(
    fetchAuth: (url: string, options?: RequestInit) => Promise<Response>,
    controller: AbortController
    ): Promise<respGet<User>> {
        const resp = await fetchAuth(`${Url_Base}/usuarios`, { signal: controller.signal });
        if (!resp) throw new Error(`No se encontraron usuarios`);
        const data = await resp.json()
        return data
}

export async function postProductos(newProduct : FormData, fetchAuth2 : (url: string, formData: FormData) => Promise<Response>): Promise <respCreate>{
    const resp = await fetchAuth2(`${Url_Base}/productos`, newProduct);
    if(!resp) throw new Error('No se pudo crear el producto');
    const data: respCreate = await resp.json()
    return{
        code: data.code,
        message: data.message
    }
    
}

export async function getDataPro(controller:AbortController): Promise<respGet<Productos>> {
    const resp = await fetch(`${Url_Base}/productos`,{signal: controller.signal});
    if(!resp.ok) throw new Error (`No se encontraron productos`)
    const data = await resp.json()
    return data
}