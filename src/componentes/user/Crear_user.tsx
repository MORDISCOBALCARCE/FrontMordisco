import { useState } from "react";
import { enviarDatos } from "./service";
import { useNavigate, NavLink } from "react-router-dom";
import type React from "react";

export function Crear_user() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [mensage, setMensage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function resetearErrores() {
    setMensage('');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!nombre || !apellido || !email || !password || !telefono) {
      setIsLoading(false);
      setMensage('Por favor, completa todos los campos');
      return;
    }

    try {
      const usuario = { nombre, apellido, telefono, password, email };
      await enviarDatos(usuario);
      // Reemplazamos el alert nativo por una redirección fluida o un mensaje de éxito si lo preferís
      navigate('/login');
    } catch (error) {
      console.error(error);
      setMensage('Hubo un error al registrar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-(--background) min-h-screen flex justify-center p-(--p-margin-mobile) md:p-(--p-lg) selection:bg-(--primary-container) selection:text-(--on-primary-container) antialiased">
      
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40vw] h-[40vw] rounded-full bg-(--primary)/5 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[30vw] h-[30vw] rounded-full bg-(--secondary-container)/20 blur-[100px]"></div>
      </div>

      {/* Register Container */}
      <main className="relative w-full max-w-120 z-10 transition-transform duration-75 ease-out">
        <div className="bg-(--surface-container-low) rounded-4xl p-(--p-md) md:p-(--p-xl) glass-depth border border-(--outline-variant)/30 transition-all duration-500 hover:translate-y-1">
          
          {/* Header Section */}
          <div className="flex flex-col items-center mb-(--p-mb-xl)">
            <h1 className="text-[24px] font-bold leading-8 text-(--on-surface) text-center">Crear Cuenta</h1>
            
            {/* CONTENEDOR DEL ERROR */}
            {mensage && (
              <div className="mt-4 w-full flex items-center gap-2 p-3 rounded-default bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[14px] transition-all duration-300">
                <p className="font-medium leading-tight text-left">{mensage}</p>
              </div>
            )}
          </div>

          {/* Form Section */}
          <form className="space-y-(--p-md)" onSubmit={handleSubmit}>
            
            {/* Campo: Nombre */}
            <div className="space-y-(--p-sm)">
              <label className="text-[14px] font-semibold text-(--on-surface-variant) block ml-1" htmlFor="nombre">
                Nombre<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-(--on-surface-variant) group-focus-within:text-(--primary) transition-colors">
                  badge
                </span>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[16px] focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all placeholder:text-(--on-surface-variant)/40" 
                  id="nombre" 
                  name="nombre" 
                  placeholder="Ingresar nombre" 
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={isLoading}
                  onClick={resetearErrores}
                  required
                />
              </div>
            </div>

            {/* Campo: Apellido */}
            <div className="space-y-(--p-sm)">
              <label className="text-[14px] font-semibold text-(--on-surface-variant) block ml-1" htmlFor="apellido">
                Apellido<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-(--on-surface-variant) group-focus-within:text-(--primary) transition-colors">
                  subtitles
                </span>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[16px] focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all placeholder:text-(--on-surface-variant)/40" 
                  id="apellido" 
                  name="apellido" 
                  placeholder="Ingresar apellido" 
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  disabled={isLoading}
                  onClick={resetearErrores}
                  required
                />
              </div>
            </div>

            {/* Campo: Mail */}
            <div className="space-y-(--p-sm)">
              <label className="text-[14px] font-semibold text-(--on-surface-variant) block ml-1" htmlFor="email">
                Mail<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-(--on-surface-variant) group-focus-within:text-(--primary) transition-colors">
                  mail
                </span>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[16px] focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all placeholder:text-(--on-surface-variant)/40" 
                  id="email" 
                  name="email" 
                  placeholder="ejemplo@correo.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  onClick={resetearErrores}
                  required
                />
              </div>
            </div>

            {/* Campo: Contraseña */}
            <div className="space-y-(--p-sm)">
              <label className="text-[14px] font-semibold text-(--on-surface-variant) block ml-1" htmlFor="password">
                Contraseña<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-(--on-surface-variant) group-focus-within:text-(--primary) transition-colors">
                  lock
                </span>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[16px] focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all placeholder:text-(--on-surface-variant)/40" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  onClick={resetearErrores}
                  required
                />
              </div>
            </div>

            {/* Campo: Teléfono */}
            <div className="space-y-(--p-sm)">
              <label className="text-[14px] font-semibold text-(--on-surface-variant) block ml-1" htmlFor="telefono">
                Teléfono<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-(--on-surface-variant) group-focus-within:text-(--primary) transition-colors">
                  call
                </span>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[16px] focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all placeholder:text-(--on-surface-variant)/40" 
                  id="telefono" 
                  name="tel" 
                  placeholder="+54 9..." 
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  disabled={isLoading}
                  onClick={resetearErrores}
                  required
                />
              </div>
            </div>

            {/* Botón de Enviar */}
            <div className="pt-(--p-sm)">
              <button 
                className={`squishy-btn w-full text-white text-[18px] py-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
                  isLoading 
                    ? "bg-[#F15A24]/80 cursor-not-allowed" 
                    : "bg-[#F15A24] hover:bg-(--primary)"
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creando cuenta...</span>
                  </>
                ) : (
                  <>
                    <span>Crear</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">how_to_reg</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          
        </div>
      </main>
    </div>
  );
}