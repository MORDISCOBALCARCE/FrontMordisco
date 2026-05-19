import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PublicRoute
 *
 * Rutas que NO deben verse si ya estás logueado (ej: /login).
 * Si el usuario SÍ está autenticado → redirige al dashboard
 * Si el usuario NO está autenticado → muestra la ruta pública
 */
export default function PublicRoute() {
  //traemos el contexto y evaluamos si esta cargando y si esta autenticado
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>
  }
  //si esta autenticado lo redirigimos al dashboard si no lo dejamos en la ruta publica
  //si no esta cargando y no esta autenticado mostramos la ruta publica
  //y si esta cargando mostramos un mensaje de cargando
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return <Outlet />
}