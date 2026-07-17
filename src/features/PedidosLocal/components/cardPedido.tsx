import { Estado, type Pedidos } from "../type";
import "../style.css";
import { useEffect, useState } from "react";
import { patchPedido } from "../../../servicio/service";
import { useApi } from "../../../hooks/useApi";
import { url_imagen } from "../../../page/menu/components/card";

interface props {
  pedido: Pedidos;
}

export function CardPedido({ pedido }: props) {
  const [estado, setEstado] = useState<Estado>(pedido.estado);
  const { fetchAuth } = useApi();

  useEffect(() => {
    if (estado === pedido.estado) return;

    const actualizarEstadoBack = async () => {
      await patchPedido({ estado }, pedido.id_pedido, fetchAuth);
    };
    actualizarEstadoBack();
  }, [estado]);

  const cambiarEstado = () => {
    setEstado(
      estado === Estado.PENDIENTE ? Estado.ENTREGADO : Estado.PENDIENTE,
    );
  };

  return (
        <div className="p-4 md:p-4">
            <article
                className="bg-(--surface-container-low) border border-(--outline-variant) rounded-2xl p-6
                glass-depth
                transition
                hover:shadow-xl
                mb-2"
            >
                {/* Cabecera del pedido */}
                <header
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 border-b border-(--outline-variant)/30
                    pb-4
                    mb-4"
                >
                    <div>
                        <h3 className="text-lg font-black text-(--on-surface)">
                            Pedido #{pedido.id_pedido}
                        </h3>
                        <p className="text-sm font-bold text-(--on-surface-variant) mb-1">
                            Fecha: {new Date(pedido.fecha_pedido).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-bold text-(--on-surface-variant) mt-1">
                            Cliente: {pedido.usuario.nombre} {pedido.usuario.apellido}
                        </p>
                        <p className="text-xs text-(--on-surface-variant) mt-0.5">
                            Dirección: {pedido.direccion_entrega}
                        </p>
                    </div>

                    <span
                        className={`
                        px-4 py-1.5
                        rounded-full
                        text-sm
                        font-bold
                        self-start sm:self-auto
                        ${
                            estado === Estado.ENTREGADO
                            ? "bg-(--success-bg) text-(--success)"
                            : "bg-(--warning-bg) text-(--warning)"
                        }
                        `}
                    >
                        {estado === Estado.ENTREGADO ? "Listo" : "Pendiente"}
                    </span>
                </header>

                {/* Productos */}
                <section className="space-y-4">
                    <h4 className="
                        text-sm
                        font-black
                        uppercase
                        text-(--on-surface-variant)
                    ">
                        Productos
                    </h4>

                    {pedido.detalles.map((p) => (
                        <div
                            key={p.id_detalle}
                            className="
                            flex
                            items-center
                            gap-4
                            bg-(--surface-container-lowest)
                            border
                            border-(--outline-variant)
                            rounded-xl
                            p-3
                            "
                        >
                            {p.producto ? (
                                <>
                                    <img
                                        src={`${url_imagen}/${p.producto.imagen}`}
                                        alt={p.producto.nombre}
                                        className="
                                        w-16
                                        h-16
                                        rounded-xl
                                        object-cover
                                        border
                                        border-(--outline-variant)
                                        "
                                    />

                                    <div className="flex-1">
                                        <h5 className="font-bold text-(--on-surface)">
                                            {p.producto.nombre}
                                        </h5>
                                        <p className="text-xs text-(--on-surface-variant)/85 mb-1 italic">
                                            {p.producto.descripcion}
                                        </p>
                                        <p className="text-sm text-(--on-surface-variant)">
                                            Cantidad: {p.cantidad}
                                        </p>
                                        <p className="text-sm text-(--on-surface-variant)">
                                            Precio unidad: ${p.precio_unitario}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 py-1">
                                    <h5 className="font-bold text-red-500">
                                        Producto eliminado
                                    </h5>
                                    <p className="text-sm text-(--on-surface-variant)">
                                        Cantidad: {p.cantidad}
                                    </p>
                                    <p className="text-sm text-(--on-surface-variant)">
                                        Precio unitario: ${p.precio_unitario}
                                    </p>
                                </div>
                            )}

                            <strong className="text-(--primary) font-black text-right min-w-[70px]">
                                ${(Number(p.precio_unitario) * p.cantidad).toFixed(2)}
                            </strong>
                        </div>
                    ))}
                </section>

                {/* Footer del pedido (Acción y Total) */}
                <footer
                    className="
                    mt-5
                    pt-4
                    borter-t
                    border-(--outline-variant)/30
                    rounded-xl
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    justify-between
                    items-stretch
                    sm:items-center
                    "
                >
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold  text-white">
                            Importe Total
                        </span>
                        <strong className="text-xl text-white">
                            ${pedido.total}
                        </strong>
                    </div>

                    <button
                        onClick={cambiarEstado}
                        className={`
                        px-5 py-2.5
                        rounded-xl
                        text-sm
                        font-extrabold
                        transition-all
                        duration-200
                        shadow-md
                        hover:scale-[1.02]
                        active:scale-95
                        text-white
                        ${
                            estado === Estado.ENTREGADO
                            ? "bg-slate-600 hover:bg-slate-500"
                            : "bg-orange-600 hover:bg-orange-500"
                        }
                        `}
                    >
                        {estado === Estado.PENDIENTE ? 'Marcar como Listo' : 'Volver a Pendiente'}
                    </button>
                </footer>
            </article>
        </div>
    );
}
