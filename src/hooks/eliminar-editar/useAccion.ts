

import { deleteData, patchEdit, restoreData } from "../../servicio/service";
import type { Productos } from "../../types/type";
import { useApi } from "../useApi";

export function useAccion() {
    const { fetchAuth } = useApi();

    const handleEdit = async (datos: Partial<Productos> , endopoint: string, id:number) =>{
        const seguro = window.confirm('¿Confirmar edit?');
        if(!seguro) return;
        const resp = await patchEdit(datos, endopoint, id , fetchAuth)
        return resp;
    }

    const handleRestore = async ( endopoint: string, id: number) =>{
         const seguro = window.confirm('¿Seguro que querés activar este producto?');
        if(!seguro) return;
        const resp = await restoreData( endopoint, id, fetchAuth)
        return resp
    }

    const handleDelete = async (endopoint:string, id: number) => {
        const seguro = window.confirm('¿Seguro que querés eliminar este producto?');
        if(!seguro) return;
        const resp = await deleteData(endopoint, id, fetchAuth);
        return resp
    }
    return { handleDelete, handleRestore, handleEdit }
}