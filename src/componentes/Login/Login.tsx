import { useNavigate } from "react-router-dom";
import './login.css'
import type React from "react";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login OK:");

    //se cambio -1 por la ruta de Mi Cuenta
    navigate("/micuenta");
  };

  return (
    <section className='login-container'>
      <div className="login-box">
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className='login-form'>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="nombre" placeholder="Tu nombre" />

          <label htmlFor="apellido">Apellido</label>
          <input type="text" name="apellido" placeholder="Tu apellido" />

          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" placeholder="ejemplo@correo.com" />

          <label htmlFor="pass">Contraseña</label>
          <input type="password" name="pass" placeholder="••••••••" />

          <button type="submit" className="btn-account">
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;