import { useAuth } from "./context/AuthContex";
import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute(){
    const { isLoading, isAuthenticate} = useAuth()

    if(isLoading){
        return <p>Cargando...</p>
    }
    if(isAuthenticate){
        return <Navigate to='/micuenta' replace/>
    }else{
        return <Outlet/>
    }
}