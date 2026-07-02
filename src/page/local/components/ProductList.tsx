
import { useEffect, useState } from "react";
import { useProductos } from "../../../hooks/useProductos";
import { TablaProductosLocal } from "./TablaProductosLocal";
import './panel-control/styles.css';
import type { Productos } from "../../../types/type";


export function ProductList() {
  const { state } = useProductos();
  const [productos, setProducto] = useState<Productos[]>([])

  useEffect(() => {
    if (state.status === 'success')
      setProducto(state.data.data)
  }, [state])

  if (state.status === 'idle' || state.status === 'loading') {
    return <p>Cargando ...</p>
  }

  if (state.status === 'error') {
    return <p>Ocurrio un error: {state.error}</p>
  }

  const cambiarInactivo = (id: number) => {
    setProducto((prev) =>
      prev.map((prod) =>
        prod.id_producto === id ? { ...prod, activo: false } : prod
      )
    );
  };

  const cambiarActivo = (id: number) => {
    setProducto((prev) =>
      prev.map((p) => p.id_producto === id ? { ...p, activo: true } : p)
    );
  };
  
  // Actualiza en el estado local solo los campos devueltos por el PATCH
  const actualizarProductoLocal = (id: number, datosActualizados: Partial<Productos>) => {
    setProducto((prev) =>
      prev.map((p) => p.id_producto === id ? { ...p, ...datosActualizados } : p)
    );
  };

  return (
    <section className="bg-white text-[#251914] rounded-2xl border border-[#e2bfb4] overflow-hidden glass-depth" >
      <article className="overflow-x-auto">

        <table className="w-full text-left border-collapse text-black">
          <thead>
            <tr className="bg-(--surface-container) border-b border-(--outline-variant)">
              <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">Imagen</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">Nombre</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">Categoria</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">Descripcion</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">Estado</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">Precio</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-center text-(--on-surface-variant)">Editar / Eliminar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--outline-variant)" >

            {productos.map((prod) => (<TablaProductosLocal key={prod.id_producto} producto={prod}
              onDelete={() => cambiarInactivo(prod.id_producto)}
              onRestore={() => cambiarActivo(prod.id_producto)}
              onEdit={(datosModificados) => actualizarProductoLocal(prod.id_producto, datosModificados)} />))}

          </tbody>
        </table>
      </article>
    </section>
  )
}