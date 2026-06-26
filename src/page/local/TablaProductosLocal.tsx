
import { useState } from "react";
import { useAccion } from "../../hooks/eliminar-editar/useAccion";
import type { Productos } from "../../types/type";
import { url_imagen } from "../menu/card";
import './panel-control/styles.css'
import { ModalProductosEdit } from "./modal/ModalProductosEdit";


interface props {
    producto: Productos;
    onDelete: () => void
    onRestore: () => void
    onEdit: (datosModificados: Partial<Productos>) => void;
}

export function TablaProductosLocal({ producto, onDelete, onRestore, onEdit }: props) {
    const { handleDelete, handleRestore, handleEdit } = useAccion();
    const [isModalOpen, setIsModalOpen] = useState(false);



    const clickEliminar = async () => {
        const resp = await handleDelete('productos', producto.id_producto);
        if (!resp) {
            return;
        }
        onDelete();
    };
    const clickRestaurar = async () => {
        const resp = await handleRestore('productos', producto.id_producto);
        if (!resp) {
            return;
        }
        onRestore();
    };

    return (
        <>
            <tr className="text-(--table-text) hover:bg-(--surface-container-low) hover:text-white transition-colors">
                <td ><img src={`${url_imagen}/${producto.imagen}`} alt={producto.nombre} style={{ width: '50 px', height: '50px', borderRadius: '50px' }} /></td>
                <td className="px-6 py-5" >
                    <div className="font-bold">
                        {producto.nombre}
                    </div>
                </td>
                <td className="px-6 py-5">
                    {producto.categoria?.nombre}
                </td>
                <td className="px-6 py-5">
                    {producto.descripcion}
                </td>

                {producto.activo ? (
                    <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-(--success-bg) text-(--success) text-xs font-bold">
                            Activo
                        </span>
                    </td>
                ) : (
                    <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-(--danger-bg) text-(--danger) text-xs font-bold">
                            Inactivo
                        </span>
                    </td>
                )}
                <td className="px-6 py-5" > $ {producto.precio}</td>
                <td className="px-6 py-5">
                    <div className="flex justify-end gap-3">

                        <button onClick={(e) => setIsModalOpen(true)}
                            className="bg-(--primary) hover:bg-(--primary-hover) text-white px-6 py-3 rounded-xl font-bold shadow-lg transition" >🔧</button>

                        {producto.activo ? (
                            <button
                                onClick={clickEliminar}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition"
                            >
                                🗑
                            </button>
                        ) : (
                            <button
                                onClick={clickRestaurar}
                                className="bg-red-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition"
                                title="Restaurar producto"
                            >
                                🔄
                            </button>
                        )}
                    </div>
                    {isModalOpen && (
                        <ModalProductosEdit
                            producto={producto}
                            // handleEdit={handleEdit}
                            onClose={() => setIsModalOpen(false)}
                            onSuccess={(datosModificados) => onEdit(datosModificados)}
                        />
                    )}
                </td>
            </tr>

        </>
    )

}