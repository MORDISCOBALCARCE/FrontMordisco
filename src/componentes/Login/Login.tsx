import { useNavigate } from "react-router-dom";
import './login.css'
import type React from "react";
import { useAuth } from "../../context/AuthContext";

export function Login() {
  const {login} = useAuth()
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    
    const target = e.target as typeof e.target & {
      nombre: { value: string };
      password: { value: string };
    };

    const nombre : string = target.nombre.value
    const password : string = target.password.value
    login(nombre,password)
    navigate("/")
  }



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