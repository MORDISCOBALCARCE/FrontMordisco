import { NavLink } from "react-router-dom";
import './navbar.css';
import logo from "../../assets/img/logo vectorizado.png";

function Navbar() {
  return (
    <nav>
      <div>
        <NavLink to="/">
        <img className="logo" src={logo} alt='logo'/>
        </NavLink>
        </div>
      <div>
        <NavLink to="/login">Iniciar sesión</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;  