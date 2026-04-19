import { NavLink } from "react-router-dom";
import './navbar.css';
import logo from "../../assets/img/logo vectorizado.png";
import {type Props, ThemeToggle } from "./themeToggle";


function Navbar({theme,onToggle}:Props) {
  return (
    <nav>
      <div>
        <NavLink to="/">
        <img className="logo" src={logo} alt='logo'/>
        </NavLink>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggle} />
        <div>
        <NavLink to="/login">Iniciar sesión</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;  