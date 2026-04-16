import { useNavigate } from "react-router-dom";
import './login.css'
import type React from "react";

function Login() {
  const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login OK:");
    navigate("/home");
  };


  return (
    <section className='login-container'>
      <h2>Página de Login</h2>

      <form onSubmit={handleSubmit} className='login-form'>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" name="nombre" />

        <label htmlFor="apellido">Apellido</label>
        <input type="text" name="apellido" />

        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" />

        <label htmlFor="pass">Contraseña</label>
        <input type="password" name="pass" />

        <button type="submit">Iniciar sesión</button>

      </form>

    </section>
  );
}

export default Login;