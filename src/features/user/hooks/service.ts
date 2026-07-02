import { Url_Base } from "../../../context/AuthContext/AuthContext";
import type { CrearUser, respCreate } from "../../../context/AuthContext/type";

export async function enviarDatos(datos: CrearUser): Promise<respCreate> {

    const resp = await fetch(`${Url_Base}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos )
    })
    if (!resp.ok) throw new Error('Error al crear el usuario')
    const data = await resp.json()

    return {
        code: data.code,
        messagge: data.message
    }
}