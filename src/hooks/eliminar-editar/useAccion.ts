

import { deleteData, patchEdit, restoreData } from "../../servicio/service";
import type { Productos } from "../../types/type";
import { useApi } from "../useApi";
import Swal from "sweetalert2";

export function useAccion() {
    const { fetchAuth } = useApi();

    const handleEdit = async (datos: Partial<Productos> , endopoint: string, id:number) =>{
         const seguro = await Swal.fire({
        title: "¿Confirmar Edición?",
        text: "Vas a editar los datos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, editar",
        cancelButtonText: "Cancelar" // Opcional: para traducirlo al español
    });
    if (!seguro.isConfirmed) return;
        const resp = await patchEdit(datos, endopoint, id , fetchAuth)
        Swal.fire({
        title: "¡Editado!",
        text: "El registro ha sido editado correctamente.",
        icon: "success"
    });
        return resp;
    }

    const handleRestore = async ( endopoint: string, id: number) =>{
         const seguro = await Swal.fire({
        title: "¿Confirmar Activación?",
        text: "Vas a activar el registro.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, activar",
        cancelButtonText: "Cancelar" // Opcional: para traducirlo al español
    });
    if (!seguro.isConfirmed) return;
        const resp = await restoreData( endopoint, id, fetchAuth)
        Swal.fire({
        title: "¡Activado!",
        text: "El registro ha sido activado correctamente.",
        icon: "success"
    });
        return resp
    }

    const handleDelete = async (endopoint:string, id: number) => {
        const seguro = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar" // Opcional: para traducirlo al español
    });


        if (!seguro.isConfirmed) return;
        const resp = await deleteData(endopoint, id, fetchAuth);
        Swal.fire({
        title: "¡Eliminado!",
        text: "El registro ha sido eliminado correctamente.",
        icon: "success"
    });
    return resp;
    }

    return { handleDelete, handleRestore, handleEdit }
}