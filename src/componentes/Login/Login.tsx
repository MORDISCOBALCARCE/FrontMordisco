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
    <>

      <section className='login-container'>
      <h2>Página de Login</h2>

        <form onSubmit={handleSubmit} className='login-form'>
          <label htmlFor="">Nombre</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Apellido</label>
          <input type="text" name="" id="" />
          <label htmlFor="">E-mail</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Contraseña</label>
          <input type="text" name="" id="" />

        <button type="submit">Iniciar sesión</button>
        </form>

      </section>
    </>
  );
}

export default Login;