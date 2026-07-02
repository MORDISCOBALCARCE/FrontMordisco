import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";

export function ProtectedRoute(){
    const {isAuthenticate, isLoading} = useAuth();

    if(isLoading){
        return <p>Cargando...</p>
    }
    if(!isAuthenticate){
        return<Navigate to={'/login'} replace/>
    }
    return <Outlet/>
}