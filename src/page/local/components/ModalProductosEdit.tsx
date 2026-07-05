import { useState, type FormEvent } from "react"

import type { Productos } from "../../../types/type";
import { useAccion } from "../../../hooks/eliminar-editar/useAccion";




interface ModalProps {
    producto: Productos;
    onClose: () => void;
    // Recibe las propiedades editadas para actualizar el estado local de la tabla
    onSuccess: (datosEditados: Partial<Productos>) => void;
}

export function ModalProductosEdit({ producto, onClose, onSuccess }: ModalProps) {
    // Estado local del formulario con los valores iniciales del producto
    const [formData, setFormData] = useState({ ...producto });
    const {handleEdit} = useAccion()
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData, // Copiamos lo que ya había
            [e.target.name]: e.target.value // Reemplazamos solo el campo que cambió (nombre, precio, etc.)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // OPTIMIZACIÓN PATCH: Filtramos y enviamos SOLO lo que cambió
        const productoEditado: Partial<Productos> = {}

        if (formData.nombre !== producto.nombre) productoEditado.nombre = formData.nombre;
        if (formData.descripcion !== producto.descripcion) productoEditado.descripcion = formData.descripcion;
        if (Number(formData.precio) !== producto.precio) productoEditado.precio = Number(formData.precio);

        // Si el usuario no cambió nada, simplemente cerramos el modal
        if (Object.keys(productoEditado).length === 0) {
            onClose();
            return;
        }

        // Ejecutamos tu hook pasándole sólo los cambios
        const resp = await handleEdit(productoEditado, 'productos', producto.id_producto);

        if (resp) {
          
                // Para actualizar la tabla de React sin perder campos (como la imagen o la categoría vieja)
                // unimos el producto original con los pocos campos que cambiaron
                const productoActualizadoCompleto: Productos = {
                    ...producto,
                    ...productoEditado
                };

                onSuccess(productoActualizadoCompleto); // Notificamos al cliente los campos que cambiaron
                onClose(); // Cerramos el modal
            }
        };

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl w-full max-w-md text-black shadow-2xl">
                    <h3 className="text-xl font-black mb-4">🔧 Editar Producto</h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* INPUT NOMBRE */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Nombre</label>
                            <input
                                type="text"
                                name="nombre" // Ojo: este 'name' debe coincidir con la propiedad de tu objeto
                                value={formData.nombre}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-xl"
                                required
                            />
                        </div>

                        {/* INPUT DESCRIPCIÓN */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion || ''}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-xl"
                            />
                        </div>

                        {/* INPUT PRECIO */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Precio ($)</label>
                            <input
                                type="number"
                                name="precio"
                                value={formData.precio}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-xl"
                                required
                            />
                        </div>

                        {/* BOTONES DE ACCIÓN */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold">
                                Cancelar
                            </button>
                            <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-700 text-white font-bold">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
