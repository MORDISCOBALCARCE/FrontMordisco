import { useState, type FormEvent } from "react";

import { useAccion } from "../../../hooks/eliminar-editar/useAccion";
import type { User } from "../../../types/type";
import { enviarDatos } from "../../../features/User/hooks/service";

interface Props {
  usuario: User | null; // Si viene null es creación, si viene objeto es edición
  onClose: () => void;
  onSuccess: (datos: Partial<User> | User) => void;
}

export function ModalUsuarioForm({ usuario, onClose, onSuccess }: Props) {
  const { handleEdit } = useAccion();
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [esExito, setEsExito] = useState(false);

  // Estructura de formulario base
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || "",
    apellido: usuario?.apellido || "",
    email: usuario?.email || "",
    telefono: usuario?.telefono || "",
    password: "", // Siempre vacío por seguridad inicial
    rol: usuario?.rol || "customer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje("");
    setEsExito(false);

    try {
      if (usuario) {
        // --- MODO EDICIÓN (PATCH) ---
        const cambios: Partial<User> = {};
        if (formData.nombre !== usuario.nombre) cambios.nombre = formData.nombre;
        if (formData.apellido !== usuario.apellido) cambios.apellido = formData.apellido;
        if (formData.email !== usuario.email) cambios.email = formData.email;
        if (formData.telefono !== usuario.telefono) cambios.telefono = formData.telefono;
        if (formData.rol !== usuario.rol) cambios.rol = formData.rol;
        if (formData.password.trim() !== "") cambios.password = formData.password;

        if (Object.keys(cambios).length === 0) {
          onClose();
          return;
        }

        const resp = await handleEdit(cambios, "usuarios", usuario.id_usuario);
        if (resp) {
          setEsExito(true);
          setMensaje(resp.message || "Usuario modificado con éxito");
          
          setTimeout(() => {
            onSuccess(cambios);
            onClose();
          }, 1500);
        }
      } else {
        // --- MODO CREACIÓN (POST) ---
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
          setMensaje("Por favor, completa los campos obligatorios");
          setIsLoading(false);
          return;
        }
        
        const resp = await enviarDatos(formData);

        if (resp.code === 201) {
          setEsExito(true);
          setMensaje(resp.messagge || "Usuario creado con éxito");
          setTimeout(() => {
            onSuccess({
              ...formData,
              id_usuario: Date.now(), 
              activo: true,
            } as User);
            onClose();
          }, 1500);
        }
      }
    } catch (err: any) {
      setMensaje(err.message || "Hubo un error al procesar el usuario");
    } finally {
      if (!esExito) setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 md:pt-30 z-50 p-4  animate-fadeIn">
      {/* Contenedor principal con alto máximo adaptativo y distribución flex col */}
      <div className="bg-(--surface-container-low) rounded-2xl p-5 w-full max-w-lg glass-depth border border-(--outline-variant)/30 max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Encabezado (Fijo arriba) */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-(--outline-variant)/20">
          <h3 className="text-xl font-black text-(--on-surface)">
            {usuario ? "🔧 Editar Usuario" : "👤 Nuevo Usuario"}
          </h3>
          <button onClick={onClose} className="text-(--on-surface-variant) hover:text-(--primary) transition font-bold text-lg">✕</button>
        </div>

        {/* Mensajes de Alerta */}
        {mensaje && (
          <div className={`mb-3 w-full p-2.5 rounded-default border text-[13px] font-bold ${
            esExito 
              ? "bg-green-500/10 border-green-500/30 text-green-600" 
              : "bg-red-500/10 border-red-500/30 text-red-600"
          }`}>
            {esExito ? "✅ " : "❌ "} {mensaje}
          </div>
        )}

        {/* Formulario estructurado para controlar de forma interna el desborde */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          
          {/* Contenedor de Scroll Interno para los Campos de texto */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-2">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Nombre */}
              <div className="space-y-0.5">
                <label className="text-[12px] font-semibold text-(--on-surface-variant) block ml-1">Nombre*</label>
                <input
                  className="w-full px-3 py-2 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[14px] focus:outline-none focus:ring-2 focus:ring-(--primary) text-(--on-surface) dark:text-white"
                  type="text" name="nombre" value={formData.nombre} onChange={handleChange} required disabled={isLoading}
                />
              </div>

              {/* Apellido */}
              <div className="space-y-0.5">
                <label className="text-[12px] font-semibold text-(--on-surface-variant) block ml-1">Apellido*</label>
                <input
                  className="w-full px-3 py-2 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[14px] focus:outline-none focus:ring-2 focus:ring-(--primary) text-(--on-surface) dark:text-white"
                  type="text" name="apellido" value={formData.apellido} onChange={handleChange} required disabled={isLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-0.5">
              <label className="text-[12px] font-semibold text-(--on-surface-variant) block ml-1">Email*</label>
              <input
                className="w-full px-3 py-2 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[14px] focus:outline-none focus:ring-2 focus:ring-(--primary) text-(--on-surface) dark:text-white"
                type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="space-y-0.5">
              <label className="text-[12px] font-semibold text-(--on-surface-variant) block ml-1">
                Contraseña{usuario ? " (Dejar vacío para mantener)" : "*"}
              </label>
              <input
                className="w-full px-3 py-2 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[14px] focus:outline-none focus:ring-2 focus:ring-(--primary) text-(--on-surface) dark:text-white"
                type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required={!usuario} disabled={isLoading}
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-0.5">
              <label className="text-[12px] font-semibold text-(--on-surface-variant) block ml-1">Teléfono</label>
              <input
                className="w-full px-3 py-2 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[14px] focus:outline-none focus:ring-2 focus:ring-(--primary) text-(--on-surface) dark:text-white"
                type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="+54 9..." disabled={isLoading}
              />
            </div>

            {/* Rol del Usuario */}
            <div className="space-y-0.5">
              <label className="text-[12px] font-semibold text-(--on-surface-variant) block ml-1">Rol de Usuario*</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-(--surface-container-lowest) border border-(--outline-variant) rounded-default text-[14px] focus:outline-none focus:ring-2 focus:ring-(--primary) text-(--on-surface) dark:text-white font-medium"
                required
                disabled={isLoading}
              >
                <option value="customer">Cliente</option>
                <option value="local">Local</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

          </div>

          {/* Acciones (Fijos abajo del todo en la ventana del modal) */}
          <div className="flex justify-end gap-2 pt-3 border-t border-(--outline-variant)/30 bg-(--surface-container-low)">
            <button
              type="button" onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-(--surface-container) text-(--on-surface-variant) font-bold text-[14px] transition hover:bg-(--outline-variant)/20 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit" disabled={isLoading}
              className="px-5 py-2 rounded-xl bg-[#F15A24] hover:bg-(--primary-hover) text-white font-bold text-[14px] transition shadow-md squishy-btn flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? "Procesando..." : usuario ? "Guardar Cambios" : "Crear Usuario"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}