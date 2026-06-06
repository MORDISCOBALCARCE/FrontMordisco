import { useAuth } from "../../context/AuthContex"


export function MiLocal() {
    const {user} = useAuth()
    
    return(
        <>
        <h1>Mi Local : {user?.nombre}</h1>
        </>
       
    )
}