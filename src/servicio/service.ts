import type { respCreate, respGet, User } from '../types/type';


export async function getUser(
    fetchAuth: (url: string, options?: RequestInit) => Promise<Response>,
    controller: AbortController
    ): Promise<respGet<User>> {
        const resp = await fetchAuth(`http://localhost:3000/usuarios`, { signal: controller.signal });
        if (!resp) throw new Error(`No se encontraron usuarios`);
        const data = await resp.json()
        return data
}

export async function postProductos(newProduct : FormData, fetchAuth2 : (url: string, formData: FormData) => Promise<Response>): Promise <respCreate>{
    const resp = await fetchAuth2('http://localhost:3000/productos', newProduct);
    if(!resp) throw new Error('No se pudo crear el producto');
    const data: respCreate = await resp.json()
    return{
        code: data.code,
        message: data.message
    }
    
}