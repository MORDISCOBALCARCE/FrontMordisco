import { CardsUsers } from "./CardsUsers";
import { useUsuarios } from "./hooks/useUsuarios"


export function Administrador(){
const {state} = useUsuarios();

if(state.status === 'idle' || state.status ==='loading'){
    return <p>Cargando</p>
}
if(state.status === 'error'){
    return <p>{state.status}</p>
}
    return(
        <>
        <h1>Administradoooooor</h1>
        {state.data.data.map(use => (<CardsUsers key={use.id} usuario={use}/>))}
        </>
    )
}