
import { useGetPedidos } from "../PedidosLocal/hook/useGetPedidos"
import { useAuth } from "../../context/AuthContext/AuthContext";
import { CardClienteCarrito } from "./components/CardClienteCarrito";

export function PedidoPorCiiente() {
    const { user } = useAuth()
    const { state } = useGetPedidos();


    if (state.status === 'idle' || state.status === 'loading') {
        return <p>Cargando...</p>
    }

    if (state.status === 'error') {
        return <p>Error: {state.error}</p>
    }
    const product = state.status === 'success' ? state.data : [];

    const pedidos = product.filter((p) => (p.usuario.id_usuario === Number(user?.id)))

    return (

        <div >
            {pedidos.map((pr) => (<CardClienteCarrito key={pr.id_pedido} pedido={pr}/>))}
        </div>
    )
}