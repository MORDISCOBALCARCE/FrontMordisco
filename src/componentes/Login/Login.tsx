// import { useNavigate } from "react-router-dom";
import {  useState } from 'react';
import './login.css'
import type React from "react";
import { useAuth } from '../auth/context/AuthContex';
import { useNavigate } from 'react-router-dom';

function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError]= useState('');

const {login} = useAuth()
const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if(!email || !password){
      setError('Por favor, completar todos los campos');
      return
    }
    try {
      await login(email,password)
      navigate('/micuenta');
      

    } catch (error) {
      setError('Credenciales incorrectas o error de conexión')
    }
  
  };

  return (
    <section className='login-container'>
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <p>{error}</p>
        <form onSubmit={handleSubmit} className='login-form'>
          <label >E-mail</label>
          <input type="email" placeholder="ejemplo@correo.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>

          <label >Contraseña</label>
          <input type="password"  placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)}/>

          <button type="submit" className="btn-account">
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;