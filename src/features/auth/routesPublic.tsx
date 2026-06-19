import { useAuth } from "../../context/AuthContex";
import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
    const { isLoading, isAuthenticate, user } = useAuth()

    if (isLoading) {
        return <p>Cargando...</p>
    }
    if (isAuthenticate) {
        if (user?.rol === 'local')
            return <Navigate to='/local' replace />

        if (user?.rol === 'admin') {
            return <Navigate to='/admin' replace />
        }
        if(user?.rol === 'customer'){
            return <Navigate to='/menu'/>
        }
        
    } else {
        return <Outlet />
    }
}