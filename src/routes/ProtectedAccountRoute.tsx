import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute (AuthGuard)
 *
 * Protege rutas que requieren autenticación.
 * Si el usuario NO está autenticado → redirige a /login
 * Si el usuario SÍ está autenticado → renderiza la ruta hija (Outlet)
 *
 * Uso:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 */
export default function ProtectedRoute() {

  const { isAuthenticated, loading } = useAuth();

  // Mientras carga el estado de auth (ej: revisando localStorage)
  if (loading) {
    return <p>Cargando...</p>
  }
  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  // Si está autenticado, renderizar la ruta protegida
  return <Outlet />

}
