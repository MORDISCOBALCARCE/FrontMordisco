// import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import './login.css'
import type React from "react";
import { useAuth } from '../../context/AuthContext/AuthContext';
import { NavLink } from 'react-router-dom';
import { PassRecoveryModal } from './component/passwordRecoveryModal';


//import { NavLink, useNavigate} from 'react-router-dom';




function Login() {
  //const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const mainRef = useRef<HTMLElement>(null);
  // 1. Traemos tanto 'error' como 'clearError' directamente del contexto
  const { login, error, clearError } = useAuth()
  // 2. Estado local para renderizar el error en pantalla
  const [errores, setErrores] = useState(error);



  function resetearErrores() {
    setErrores('');
    setPasswordError('');
    clearError();
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    resetearErrores(); // Limpiamos errores viejos al volver a intentar

    if (!email || !password) {
      setIsLoading(false);
      //setError('Por favor, completa todos los campos');
      return
    }

    if (password.length < 8) {
      setIsLoading(false);
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const response = await login(email, password)
      if (!response.access_token) {
        setIsLoading(false);
        return; // Frenamos la ejecución aquí
      }

    } catch (error) {


    } finally {

      setIsLoading(false);
    }

  };

  return (
    <div className="login-theme bg-(--background) min-h-screen flex  justify-center p-(--p-margin-mobile) md:p-(--p-lg) selection:bg-(--primary-container) selection:text-(--on-primary-container) antialiased">

      {/* Ambient Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40vw] h-[40vw] rounded-full bg-(--primary)/5 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[30vw] h-[30vw] rounded-full bg-(--secondary-container)/20 blur-[100px]"></div>
      </div>

      {/* Login Container */}
      <main ref={mainRef} className="relative w-full max-w-120 z-10 transition-transform duration-75 ease-out">
        <div className="bg-(--surface-container-low) rounded-4xl p-(--p-md) md:p-(--p-xl) glass-depth border border-(--outline-variant)/30 transition-all duration-500 hover:translate-y-1">

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-(--p-mb-xl)">

            <h1 className="text-[24px] font-bold leading-8 text-(--on-surface) text-center">Inicio de Sesión</h1>
            {/* CONTENEDOR DEL ERROR: Aparece solo si el estado 'error' tiene texto */}

            {errores && (
              <div className="mt-4 w-full flex items-center gap-2 p-3 rounded-default bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[14px] transition-all duration-300">

                <p className="font-medium leading-tight text-left">{errores}</p>
              </div>
            )}
          </div>

          {/* Form Section */}
          <form className="space-y-(--p-md)" onSubmit={handleSubmit}>
            <div className="space-y-(--p-sm)">
              <label className="text-[14px] font-semibold text-(--on-surface-variant) block ml-1" htmlFor="username">
                Usuario<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-(--on-surface-variant) group-focus-within:text-(--primary) transition-colors">
                  person
                </span>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[16px] focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all placeholder:text-(--on-surface-variant)/40"
                  id="username"
                  name="username"
                  placeholder="Ingresá tu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  onClick={resetearErrores}
                  required
                />
              </div>
            </div>

            <div className="space-y-(--p-sm)">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[14px] font-semibold text-(--on-surface-variant) block" htmlFor="password">
                  Contraseña<span className="text-red-500 font-bold">*</span>
                </label>
              </div>
              <div className="relative group">

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-(--on-surface-variant) hover:text-(--primary) focus:outline-none transition-colors z-20"
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? 'lock_open_right' : 'lock'}
                </button>

                <input
                  className="w-full pl-12 pr-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[16px] focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all placeholder:text-(--on-surface-variant)/40"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  onClick={resetearErrores}
                  required
                />
              </div>

              {passwordError && (
                <p className="text-red-600 dark:text-red-400 text-[13px] font-medium ml-1 mt-1 transition-all animate-fade-in">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="pt-(--p-sm)">
              <button
                className={`squishy-btn w-full text-white text-[18px] py-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group ${isLoading
                    ? "bg-[#F15A24]/80 cursor-not-allowed"
                    : "bg-[#F15A24] hover:bg-(--primary)"
                  }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-(--p-mt-xl) flex flex-col items-center gap-(--p-md)">
            <button
              type="button"
              className="text-[14px] font-semibold text-(--primary) hover:text-(--primary-container) transition-colors underline-offset-4 hover:underline"
              onClick={() => setShowRecoveryModal(true)}
            >
              ¿Olvidaste tu contraseña?
            </button>
            <NavLink to={"/crear_user"}>Crear cuenta</NavLink>

          </div>
        </div>


      </main>
      <PassRecoveryModal
        isOpen={showRecoveryModal}
        onClose={() => setShowRecoveryModal(false)}
      />
    </div>
  );
}

export default Login;