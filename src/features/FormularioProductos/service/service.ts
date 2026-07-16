import type { respCreate } from "../../../types/type";

const Url_Base = 'http://localhost:3000';


export async function postProductos(newProduct: FormData, fetchAuthMedia: (url: string, formData: FormData) => Promise<Response>): Promise<respCreate> {
    const resp = await fetchAuthMedia(`${Url_Base}/productos`, newProduct);
    if (!resp) throw new Error('No se pudo crear el producto');
    const data: respCreate = await resp.json()
    return {
        code: data.code,
        message: data.message
    }
}