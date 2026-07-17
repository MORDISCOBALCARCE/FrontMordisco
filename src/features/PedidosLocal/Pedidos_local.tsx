import { CardPedido } from "./components/cardPedido";
import { useGetPedidos } from "./hook/useGetPedidos"

export function Pedidos_local(){
    const {state} = useGetPedidos();
    if(state.status === 'idle' || state.status === 'loading'){
        return <p>Cargando</p>
    }
    if(state.status === 'error'){
        return <p>Error: {state.error}</p>
    }

    return(
        
        <section >
            {state.data.toReversed().map((p)=><CardPedido key={p.id_pedido} pedido={p}/>)}
        </section>
        
    )
}