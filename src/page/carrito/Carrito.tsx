import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContex";
import { useCarrito } from "../../context/caritoContext/CarritoContext";
import { Estado, EstadoDePago, MetodoPago, ModoRetiro, type createPedido } from "../../context/caritoContext/typeCarrito";
import { useApi } from "../../hooks/useApi";
import { postPedido } from "../../servicio/service";
import { PedidoPorCiiente } from "../../features/pedidoPorCliente/PedidoPorCliente";

export function Carrito() {
    const { carrito, totalPrecio, limpiarCarrito, eliminarDelCarrito } = useCarrito();
    const { user } = useAuth();
    const { fetchAuth } = useApi()
    const [direccion, setdireccion] = useState('')

    

    const enviarPedidoAlBackend = async () => {
        if (carrito.length === 0) return alert("Tu carrito está vacío.");

        // Construimos el DTO que procesará el pedidoRepository.save() con cascada
        const pedido: createPedido = {
            estado: Estado.PENDIENTE,
            modalidad: ModoRetiro.RETIRO,
            total: totalPrecio,
            metodo_pago: MetodoPago.TRANSFERENCIA,
            estado_pago: EstadoDePago.PENDIENTE,
            direccion_entrega: direccion, // O null si es retiro
            observaciones: "Pedido enviado desde la app móvil/web",
            usuario: Number(user!.id), // ID del cliente logueado
            // Mapeamos los items respetando la relación 1:1 de DetallesPedido -> Producto
            detalles: carrito.map((item) => ({
                cantidad: item.cantidad,
                precio_unitario: Number(item.producto.precio),
                observaciones_pedido: item.observaciones,
                producto_id: Number(item.producto.id_producto) // TypeORM enlazará la FK automáticamente
            }))
        };
        // console.log(user?.id)
        setdireccion('')
        try {
            const resp = await postPedido(pedido, fetchAuth)
            if (resp.code === 201) {
                alert("¡Pedido realizado con éxito!");
                limpiarCarrito();

            } else {
                alert(`Error al procesar: ${resp.message}`);
            }
        } catch (error) {
            console.error("Error de conexión de red:", error);
        }
    };

    return (

        <>
            {carrito.map((item) => (<div key={item.producto.id_producto}>
                <p><strong>Producto:</strong> {item.producto.nombre}</p>
                <p><strong>Precio X Unidad:</strong> {item.producto.precio}</p>
                <p><strong>Descripcion:</strong> {item.producto.descripcion}</p>
                <p><strong>Cantidades de Producto:</strong> {item.cantidad}</p>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => eliminarDelCarrito(item.producto.id_producto)}>Eliminar</button>
            </div>))}

            <form >
                <label>Direccion: </label>
                <input type="text" value={direccion} onChange={(e) => setdireccion(e.target.value)} />
            </form>
            <h2>
                Total a pagar: ${totalPrecio.toFixed(2)}
            </h2>

            <button
                onClick={enviarPedidoAlBackend}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white p-2 rounded-xl transition-all shadow-md active:scale-95">
                Confirmar Compra
            </button>


            <PedidoPorCiiente />
        </>
    );
};
