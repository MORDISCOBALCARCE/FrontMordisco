import { useAuth } from "../auth/context/AuthContex"


export function MiCuenta() {
    const {user} = useAuth()
    
    return(
        <>
        <h1>Mi cuenta = {user?.nombre}</h1>
        </>
       
    )
}