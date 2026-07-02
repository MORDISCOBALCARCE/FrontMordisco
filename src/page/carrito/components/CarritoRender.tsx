import "../style.css";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext/AuthContext";
import { useCarrito } from "../../../context/CarritoContext/CarritoContext";
import {
    Estado,
    EstadoDePago,
    MetodoPago,
    ModoRetiro,
    type createPedido
} from "../../../context/CarritoContext/typeCarrito";
import { useApi } from "../../../hooks/useApi";
import { postPedido } from "../../../servicio/service";


export function CarritoRender() {
    const { carrito, totalPrecio, limpiarCarrito, eliminarDelCarrito } = useCarrito();
    const { user } = useAuth();
    const { fetchAuth } = useApi()
    const [direccion, setdireccion] = useState('')

   

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
            usuario: Number(user!.id), // ID del cliente logueado
            // Mapeamos los items respetando la relación 1:1 de DetallesPedido -> Producto
            detalles: carrito.map((item) => ({
                cantidad: item.cantidad,
                precio_unitario: Number(item.producto.precio),
                observaciones_pedido: item.observaciones,
                producto_id: Number(item.producto.id_producto)
            }))
        };

        setdireccion('');

        try {
            const resp = await postPedido(pedido, fetchAuth);

            if (resp.code === 201) {
                alert("¡Pedido realizado con éxito!");
                limpiarCarrito();
            } else {
                throw new Error(`Error code ${resp.code}: ${resp.message}`);
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="carrito-container">

            <div className="carrito-header">
                <h1 className="carrito-title">
                    Mi Carrito de Compras
                </h1>

                <p className="carrito-subtitle">
                    Gestioná los productos seleccionados para tu pedido
                </p>
            </div>

            {carrito.length === 0 ? (
                <p className="carrito-vacio">
                    Tu carrito está vacío.
                </p>
            ) : (
                <div className="carrito-wrapper">

                    <table className="carrito-table">
                        <thead>
                            <tr>
                                <th>CANTIDAD</th>
                                <th>PRODUCTO / DESCRIPCIÓN</th>
                                <th>PRECIO UNITARIO</th>
                                <th>SUBTOTAL</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>

                        <tbody>
                            {carrito.map((item) => (
                                <tr key={item.producto.id_producto}>

                                    <td>
                                        <span className="cantidad-badge">
                                            {item.cantidad}
                                        </span>
                                    </td>

                                    <td>
                                        <strong className="producto-nombre">
                                            {item.producto.nombre}
                                        </strong>

                                        <p className="producto-descripcion">
                                            {item.producto.descripcion}
                                        </p>
                                    </td>

                                    <td className="precio">
                                        ${Number(item.producto.precio).toFixed(2)}
                                    </td>

                                    <td className="subtotal">
                                        ${(item.cantidad *
                                            Number(item.producto.precio)).toFixed(2)}
                                    </td>

                                    <td className="acciones">
                                        <button
                                            className="btn-eliminar"
                                            onClick={() =>
                                                eliminarDelCarrito(
                                                    item.producto.id_producto
                                                )
                                            }
                                        >
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="carrito-footer">

                        <form
                            className="direccion-form"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label>
                                Dirección de Entrega:
                            </label>

                            <input
                                type="text"
                                value={direccion}
                                onChange={(e) => setdireccion(e.target.value)}
                                placeholder="Ingresá tu calle y altura"
                            />
                        </form>

                        <div className="compra-box">

                            <div className="total-box">
                                <span>Total a pagar:</span>

                                <strong>
                                    ${totalPrecio.toFixed(2)}
                                </strong>
                            </div>

                            <button
                                className="btn-confirmar"
                                onClick={enviarPedidoAlBackend}
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