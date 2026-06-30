import { useState } from "react";
import { useAuth } from "../../context/AuthContex";
import { useCarrito } from "../../context/caritoContext/CarritoContext";
import { Estado, EstadoDePago, MetodoPago, ModoRetiro, type createPedido } from "../../context/caritoContext/typeCarrito";
import { useApi } from "../../hooks/useApi";
import { postPedido } from "../../servicio/service";

export function Carrito() {
    const { carrito, totalPrecio, limpiarCarrito, eliminarDelCarrito } = useCarrito();
    const { user } = useAuth();
    const { fetchAuth } = useApi();
    const [direccion, setdireccion] = useState('');

    const enviarPedidoAlBackend = async () => {
        if (carrito.length === 0) return alert("Tu carrito está vacío.");

        const pedido: createPedido = {
            estado: Estado.PENDIENTE,
            modalidad: ModoRetiro.RETIRO,
            total: totalPrecio,
            metodo_pago: MetodoPago.TRANSFERENCIA,
            estado_pago: EstadoDePago.PENDIENTE,
            direccion_entrega: direccion,
            observaciones: "Pedido enviado desde la app móvil/web",
            usuario: Number(user!.id),
            detalles: carrito.map((item) => ({
                cantidad: item.cantidad,
                precio_unitario: Number(item.producto.precio),
                observaciones_pedido: item.observaciones,
                producto_id: Number(item.producto.id_producto)
            }))
        };

        try {
            const resp = await postPedido(pedido, fetchAuth);
            if (resp.code === 201) {
                alert("¡Pedido realizado con éxito!");
                setdireccion(''); // Limpiamos el estado después del éxito, no antes
                limpiarCarrito();
            } else {
                alert(`Error al procesar: ${resp.message}`);
            }
        } catch (error) {
            console.error("Error de conexión de red:", error);
        }
    };

    return (
        <div className="max-w-[1200px] w-[90%] mx-auto my-10 px-5 text-left">

            {/* Encabezado del Panel */}
            <div className="mb-6 text-left">
                <h1 className="text-[2.2rem] font-extrabold m-0 tracking-tight" style={{ color: 'var(--on-surface)' }}>
                    Mi Carrito de Compras
                </h1>
                <p className="mt-1 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                    Administrá los productos seleccionados para tu pedido
                </p>
            </div>

            {carrito.length === 0 ? (
                <p className="text-center text-lg p-10" style={{ color: 'var(--on-surface-variant)' }}>
                    Tu carrito está vacío.
                </p>
            ) : (
                /* Contenedor wrapper idéntico al panel de administración */
                <div className="overflow-hidden w-full"
                    style={{
                        border: '1px solid var(--outline)',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--surface-container-lowest)',
                        boxShadow: 'var(--shadow-soft)'
                    }}>

                    <table className="w-full border-collapse text-left m-0 p-0">
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--outline)' }}>
                                <th className="text-[0.8rem] font-bold tracking-wider px-5 py-4 uppercase bg-black/10 text-left" style={{ color: 'var(--outline-variant)' }}>
                                    CANTIDAD
                                </th>
                                <th className="text-[0.8rem] font-bold tracking-wider px-5 py-4 uppercase bg-black/10 text-left" style={{ color: 'var(--outline-variant)' }}>
                                    PRODUCTO / DESCRIPCIÓN
                                </th>
                                <th className="text-[0.8rem] font-bold tracking-wider px-5 py-4 uppercase bg-black/10 text-left" style={{ color: 'var(--outline-variant)' }}>
                                    PRECIO UNITARIO
                                </th>
                                <th className="text-[0.8rem] font-bold tracking-wider px-5 py-4 uppercase bg-black/10 text-left" style={{ color: 'var(--outline-variant)' }}>
                                    SUBTOTAL
                                </th>
                                <th className="text-[0.8rem] font-bold tracking-wider px-5 py-4 uppercase bg-black/10 text-center" style={{ color: 'var(--outline-variant)' }}>
                                    ACCIONES
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((item) => (
                                <tr key={item.producto.id_producto} style={{ borderBottom: '1px solid var(--outline)' }} className="last:border-b-0">

                                    {/* Cantidad */}
                                    <td className="px-5 py-5 align-middle text-left">
                                        <span className="px-[14px] py-[6px] rounded-full font-bold text-[0.85rem] inline-block"
                                            style={{ backgroundColor: 'var(--secondary-container)', color: 'var(--primary-container)' }}>
                                            {item.cantidad}
                                        </span>
                                    </td>

                                    {/* Nombre e info */}
                                    <td className="px-5 py-5 align-middle text-left">
                                        <strong className="block text-[1.05rem] font-bold" style={{ color: 'var(--on-surface)' }}>
                                            {item.producto.nombre}
                                        </strong>
                                        <p className="mt-1 text-[0.88rem]" style={{ color: 'var(--on-surface-variant)' }}>
                                            {item.producto.descripcion}
                                        </p>
                                    </td>

                                    {/* Precio Unitario */}
                                    <td className="px-5 py-5 align-middle text-left font-semibold" style={{ color: 'var(--on-surface)' }}>
                                        ${Number(item.producto.precio).toFixed(2)}
                                    </td>

                                    {/* Subtotal */}
                                    <td className="px-5 py-5 align-middle text-left font-bold" style={{ color: 'var(--primary)' }}>
                                        ${(item.cantidad * Number(item.producto.precio)).toFixed(2)}
                                    </td>

                                    {/* Tacho de borrar */}
                                    <td className="px-5 py-5 align-middle text-center">
                                        <button
                                            type="button"
                                            onClick={() => eliminarDelCarrito(item.producto.id_producto)}
                                            className="bg-transparent border-none cursor-pointer p-2 rounded-xl inline-flex items-center justify-center transition-all duration-200 hover:text-red-500 hover:bg-red-500/10"
                                            style={{ color: 'var(--on-surface-variant)' }}
                                        >
                                            <span className="material-symbols-outlined text-[22px]">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Footer del panel */}
                    <div className="px-5 py-6 flex flex-wrap justify-between items-center gap-5 bg-black/10" style={{ borderTop: '1px solid var(--outline)' }}>

                        {/* Contenedor de Dirección sin etiqueta <form> para evitar submit loops */}
                        <div className="flex flex-col gap-1.5 min-w-[300px] text-left">
                            <span className="text-[0.8rem] font-bold uppercase" style={{ color: 'var(--outline-variant)' }}>
                                Dirección de Entrega:
                            </span>
                            <input
                                type="text"
                                value={direccion}
                                onChange={(e) => setdireccion(e.target.value)}
                                placeholder="Ingresá tu calle y altura"
                                className="px-3.5 py-3 outline-none w-full box-border transition-all duration-200 focus:border-[var(--primary)]"
                                style={{
                                    border: '1px solid var(--outline)',
                                    borderRadius: 'var(--radius-sm)',
                                    backgroundColor: 'var(--surface-container-lowest)',
                                    color: 'var(--on-surface)'
                                }}
                            />
                        </div>

                        {/* Total y Confirmación */}
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-end">
                                <span className="text-[0.8rem] font-semibold" style={{ color: 'var(--on-surface-variant)' }}>Total a pagar:</span>
                                <span className="text-2xl font-extrabold" style={{ color: 'var(--on-surface)' }}>
                                    ${totalPrecio.toFixed(2)}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={enviarPedidoAlBackend}
                                className="border-none px-7 py-3 rounded-full text-[0.95rem] font-bold cursor-pointer inline-flex items-center gap-2 shadow-md transition-all active:scale-[0.97]"
                                style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary-container)' }}
                            >
                                + Confirmar Compra
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}