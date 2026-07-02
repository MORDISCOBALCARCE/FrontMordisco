
import type { createPedido} from '../context/CarritoContext/typeCarrito';
import type { Pedidos } from '../features/PedidosLocal/type';
import type { Local, Productos, respCreate, respGet, User } from '../types/type';

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

export async function getLocal(
    fetchAuth: (url: string, options?: RequestInit) => Promise<Response>,
    controller: AbortController
    ): Promise<respGet<Local>> {
        const resp = await fetchAuth(`${Url_Base}/locales`, { signal: controller.signal });
        if (!resp) throw new Error(`No se encontraron locales`);
        const data = await resp.json()
        return data
}

export async function getDataPro(controller: AbortController): Promise<respGet<Productos>> {
    const resp = await fetch(`${Url_Base}/productos`, { signal: controller.signal });
    if (!resp.ok) throw new Error(`No se encontraron productos`)
    const data = await resp.json()
    return data
}

export async function deleteData(endopoint: string, id: number, fetchAuth: (url: string, options?: RequestInit) => Promise<Response>): Promise<respCreate> {
    const resp = await fetchAuth(`${Url_Base}/${endopoint}/${id}`, {
        method: 'DELETE'
    });
    if (!resp) throw new Error(`No se pudo se pudo eliminar`)
    const data: respCreate = await resp.json()
    return data

}

export async function restoreData(endopoint: string, id: number, fetchAuth: (url: string, options?: RequestInit) => Promise<Response>): Promise<respCreate> {
    const resp = await fetchAuth(`${Url_Base}/${endopoint}/${id}/restore`, {
        method: 'PATCH'
    });
    if (!resp) throw new Error('No se pudo restaurar esta propiedad')
    const data = await resp.json()
    return data
}

export async function patchEdit(datos: Partial<Productos>, endopoint: string, id: number, fetchAuth: (url: string, options?: RequestInit) => Promise<Response>): Promise<respCreate> {

    const resp = await fetchAuth(`${Url_Base}/${endopoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    if (!resp) throw new Error('No se pudo modificar esta propiedad')
    const data = await resp.json()
    return data
}

export async function postPedido(datos: createPedido, fetchAuth: (url: string, options?: RequestInit) => Promise<Response>) : Promise<respCreate> {
    const resp = await fetchAuth(`${Url_Base}/pedidos`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    if (!resp) throw new Error('No se pudo modificar esta propiedad')
    const data : respCreate = await resp.json()
    return data
}

export async function getPedidosLocal(controller : AbortController, fetchAuth: (url: string, options?: RequestInit) => Promise<Response>): Promise<respGet<Pedidos>> {
    const resp = await fetchAuth(`${Url_Base}/pedidos`,{signal: controller.signal});
    if(!resp.ok) throw new Error('Error al cargar los pedidos')
    const data : respGet<Pedidos> = await resp.json()
    return {
        code : data.code,
        message: data.message,
        data: data.data
    }

}

export async function patchPedido(datos: Partial<Pedidos> , id: number,  fetchAuth: (url: string, options?: RequestInit) => Promise<Response>): Promise<respCreate>{
    const resp = await fetchAuth(`${Url_Base}/pedidos/${id}`,{
        method: 'PATCH',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(datos)
    });
    if(!resp) throw new Error('Error al modificar el pedido');
    const data = await resp.json();
    return data;
}