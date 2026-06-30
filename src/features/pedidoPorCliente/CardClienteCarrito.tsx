
import { url_imagen } from "../../page/menu/card";
import type { Pedidos } from "../pedidos-local/type";
import './cardStyles.css';

interface Props {
    pedido: Pedidos
}

export function CardClienteCarrito({ pedido }: Props) {
    return (
        <>
        
            <div className="cont-principal">
                <p className="p-cont">{pedido.detalles.map((p) => <div className="cont-div">
                    <img src={`${url_imagen}/${p.producto.imagen}`} alt={`${p.producto.nombre}`} style={{ width: '50px', height: '50px' }} />
                    <p>Cantidad: {p.cantidad}</p>
                    <p>Producto: {p.producto.nombre}</p>
                    <p>Fecha: {pedido.fecha_pedido}</p>
                    <p>Estado: {pedido.estado === 'entregado' ? 'listo' : 'pendiente'}</p>
                </div>)}</p>
                    <p>Total Pagar: {pedido.total}</p>
            </div>
        </>
    )
}