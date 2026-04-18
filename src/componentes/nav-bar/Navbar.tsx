import { NavLink } from "react-router-dom";
import './navbar.css';
import logo from "../../assets/img/logo vectorizado.png";
import { ThemeToggle } from "./themeToggle";
import { useThemeMode } from "./useThemeMode";




function Navbar() {
  const {theme,toggleTheme} = useThemeMode()
  return (
    <nav>
      <div>
        <NavLink to="/">
        <img className="logo" src={logo} alt='logo'/>
        </NavLink>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <div>
        <NavLink to="/login">Iniciar sesión</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;  