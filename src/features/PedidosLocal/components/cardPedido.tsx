import { Estado, type Pedidos } from "../type";
import '../style.css';
import { useEffect, useState } from "react";
import { patchPedido } from "../../../servicio/service";
import { useApi } from "../../../hooks/useApi";

interface props {
    pedido: Pedidos
}

export function CardPedido({ pedido }: props) {
    const [estado, setEstado] = useState<Estado>(pedido.estado);
    const { fetchAuth } = useApi()

    useEffect(() => {
        if (estado === pedido.estado) return;

        const actualizarEstadoBack = async () => {
            try {
                const enviar = await patchPedido({ estado }, pedido.id_pedido, fetchAuth);
            } catch (error) {

            }

        }
        actualizarEstadoBack()

    }, [estado])

    const cambiarEstado = () => {
        setEstado(estado === Estado.PENDIENTE ? Estado.ENTREGADO : Estado.PENDIENTE)
    }

    return (
        <article className="cont_pedido">
            <strong>Nombre: <span>{pedido.usuario.nombre}</span></strong>
            <p>Apellido:{pedido.usuario.apellido}</p>
            <p>Direccion:{pedido.direccion_entrega}</p>
            <p>Estado del pedido: {estado === 'entregado' ? 'listo' : 'pendiente'}</p>
            <ul>
                {pedido.detalles.map((p) => (
                    <li key={p.id_detalle}>
                        <span><strong>{p.producto.nombre}:  {p.cantidad}</strong></span>
                        <span>Descripcion: {p.producto.descripcion}</span>
                       <span> precio unidad: {p.precio_unitario}</span>
                    </li>
                ))}
            </ul>

            <p>Importe Total: {pedido.total}</p>
            <button
                style={{
                    // Un pequeño ajuste dinámico en línea solo para el color si cambia a 'Pendiente'
                    backgroundColor: estado === Estado.ENTREGADO ? '#64748b' : '#b36200'
                }}
                onClick={cambiarEstado}>{estado === Estado.PENDIENTE ? 'Marcar como Listo' : 'Volver a Pendiente'}</button>
            <p></p>
        </article>
    )

}