import { NavLink, useLocation } from "react-router-dom"; // Importamos useLocation
import logo from "../../assets/img/logo vectorizado.png";
import { ThemeToggle } from "./themeToggle";
import type { Theme } from "../../types/types";
import "./navbar.css";

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export function Navbar({ theme, onToggle }: Props) {
  // El hook useLocation nos dice en qué ruta estamos parados
  const location = useLocation();

  // Creamos una constante que es true si estamos en la página de Mi Cuenta
  const isMiCuentaPage = location.pathname === "/micuenta";

  return (
    <nav className="glass-nav">
      <div className="nav-container">

        <div className="logo-section">
          <NavLink to="/">
            <img className="logo-img" src={logo} alt="mordisco" />
          </NavLink>
        </div>

        <div className="nav-actions">
          <div className="action-item">
            <ThemeToggle theme={theme} onToggle={onToggle} />
          </div>

          <div className="action-item cart-icon-wrapper">
            <span className="material-icons-round">shopping_cart</span>
            <span className="cart-badge">2</span>
          </div>

          {isMiCuentaPage ? (
            // Si la URL es /micuenta, mostramos solo este botón
            <NavLink to="/micuenta" className="btn-account">
              <span className="material-icons-round">account_circle</span>
              Mi Cuenta
            </NavLink>
          ) : (
            <>
              <NavLink to="/menu" className="btn-account">
                menu
              </NavLink>

              <NavLink to="/login" className="btn-account">
                <span className="material-icons-round">person</span>
                Iniciar Sesion
              </NavLink>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}