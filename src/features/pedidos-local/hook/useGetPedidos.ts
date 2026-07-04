import { useEffect, useState } from "react";
import type { FetchState } from "../../../types/type";
import type { Pedidos } from "../type";
import { getPedidosLocal } from "../service";
import { useApi } from "../../../hooks/useApi";

export function useGetPedidos () {
    const[state, setState] = useState<FetchState<Pedidos[]>>({status:'idle'});
    const{fetchAuth} = useApi()

    useEffect(()=>{
        const controller = new AbortController();
        setState({status:'loading'})

        const pedidos = async () =>{
            try {    
                const resp = await getPedidosLocal(controller, fetchAuth);
                if(resp.code !== 200){
                   return setState({status:'error',error: `${resp.code && resp.message}`})
                }

                setState({status:'success', data: resp.data})
            } catch (error) {
                  if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }
                setState({ status: 'error', error: 'Error de red o conexión' })
            }
        }
        pedidos()

        return ()=> {controller.abort()}
        
    },[])
    
    return {state}
}

