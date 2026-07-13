
import { url_imagen } from "../../../page/menu/components/card";
import type { Pedidos } from "../../PedidosLocal/type";

interface Props {
    pedido: Pedidos
}

export function CardClienteCarrito({ pedido }: Props) {
    return (
        <article
            className=" bg-(--surface-container-low) border border-(--outline-variant) rounded-2xl p-6
            glass-depth
            transition
            hover:shadow-xl
            mb-2
            "
        >

            {/* Cabecera del pedido */}
            <header
                className=" flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-(--outline-variant)/30
                pb-4
                mb-4
                "
            >

                <div>
                    <h3 className="text-lg font-black text-(--on-surface)">
                        Pedido #{pedido.id_pedido}
                    </h3>

                    <p className="text-sm text-(--on-surface-variant)">
                        {new Date(pedido.fecha_pedido).toLocaleDateString()}
                    </p>
                </div>


                <span
                    className={`
                    px-4 py-1.5
                    rounded-full
                    text-sm
                    font-bold
                    ${
                        pedido.estado === "entregado"
                        ? 
                        "bg-(--success-bg) text-(--success)"
                        :
                        "bg-(--warning-bg) text-(--warning)"
                    }
                    `}
                >
                    {pedido.estado === "entregado"
                        ? "Entregado"
                        : "Pendiente"}
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


                {
                    pedido.detalles.map((p) => (

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

                                <h5 className="
                                    font-bold
                                    text-(--on-surface)
                                ">
                                    {p.producto.nombre}
                                </h5>


                                <p className="
                                    text-sm
                                    text-(--on-surface-variant)
                                ">
                                    Cantidad: {p.cantidad}
                                </p>


                                <p className="
                                    text-sm
                                    text-(--on-surface-variant)
                                ">
                                    Precio unidad: ${p.precio_unitario}
                                </p>

                            </div>


                            <strong className="
                                text-(--primary)
                                font-black
                            ">
                                $
                                {
                                    (
                                        Number(p.precio_unitario)
                                        *
                                        p.cantidad
                                    ).toFixed(2)
                                }
                            </strong>


                        </div>

                    ))
                }

            </section>


            {/* Total */}
            <footer
                className="
                mt-5
                pt-4
                border-t
                border-(--outline-variant)/30
                flex
                justify-between
                items-center
                rounded-xl
                "
            >

                <span className="
                    font-semibold
                    text-white
                ">
                    Total pagado
                </span>


                <strong
                    className="
                    text-xl
                    text-white
                    "
                >
                    ${pedido.total}
                </strong>

            </footer>


        </article>
    )
}