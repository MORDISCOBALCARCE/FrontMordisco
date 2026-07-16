import { NavLink, useNavigate, useLocation } from "react-router-dom"; // Importamos useLocation
import { useEffect } from "react";
import logo from "../../assets/img/logo vectorizado.png";
import { ThemeToggle } from "./hooks/themeToggle";
import type { Theme } from "../../types/type";
import "./navbar.css";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useCarrito } from "../../context/CarritoContext/CarritoContext";

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export function Navbar({ theme, onToggle }: Props) {
  // El hook useLocation nos dice en qué ruta estamos parados
  // const location = useLocation();
  const { logout, user, isAuthenticate, clearError } = useAuth();
  const navigate = useNavigate()
  const location = useLocation(); // Traemos la ubicación actual
  const {carrito} = useCarrito()
  // CADA VEZ QUE LA RUTA CAMBIE, LIMPIAMOS EL ERROR DEL CONTEXTO
  useEffect(() => {
    clearError();
  }, [location.pathname]); 

  const handleLogout = () => {
    logout();
    navigate('/')
  }
  // Creamos una constante que es true si estamos en la página de Mi Cuenta
  // const isMiCuentaPage = location.pathname === "/micuenta";

  return (
    <nav className="glass-nav">
      <section className="nav-container">

        <article className="logo-section">
          <NavLink to="/">
            <img className="logo-img" src={logo} alt="mordisco" />
          </NavLink>
        </article>

        <article className="nav-actions">
          {/* 1. Botón del tema */}
          <div className="action-item">
            <ThemeToggle theme={theme} onToggle={onToggle} />
          </div>

          {/* 2. Carrito de compras */}
        
          <div className="action-item cart-icon-wrapper">
            
            <NavLink to={'/carrito'}>
            <span className="material-icons-round">shopping_cart</span>
            </NavLink>
            {isAuthenticate && user?.id ?
            <span className="cart-badge">{carrito.reduce((acc, item) => acc + item.cantidad , 0)}</span>
            :<span className="cart-badge">{0}</span>
            } 
            </div>

          {/*  El Menú siempre visible */}
          <NavLink to="/menu" className="btn-account">
            Menú
          </NavLink>


          {isAuthenticate ? (
            // SI EL USUARIO ESTÁ LOGUEADO:
            <>
              {/* Mostramos "Mi Cuenta" solo si NO estamos parados en esa página */}
      
              {user?.rol === 'local' ? (
          
                <NavLink to="/local" className="btn-account">
                  <span className="material-icons-round">account_circle</span>
                  Local: {user?.nombre}
                </NavLink>

                ) : user?.rol === 'admin' ? (
                  <NavLink to='/admin'  className="btn-account">
                    <span className="material-icons-round">account_circle</span>
                    Admin {user?.nombre}
                  </NavLink>

                ): user?.rol === 'customer' ?(
                  <NavLink to='/menu'/>
                  
                ) : null
              }

              {/* El botón Cerrar Sesión SIEMPRE se mostrará si estás logueado */}
              <button onClick={handleLogout} className="btn-account">
                Cerrar Sesión
              </button>
            </>
          ) : (
            // SI EL USUARIO NO ESTÁ LOGUEADO:
            <NavLink to="/login" className="btn-account">
              <span className="material-icons-round">person</span>
              Iniciar Sesión
            </NavLink>
          )}
        </article>

      </section>
    </nav>
  );
}