import { Url_Base } from "../../context/AuthContex";
import type { respCreate } from "../../context/type";
import type { respGet } from "../../types/type";
import type { Pedidos } from "./type";



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