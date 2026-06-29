
import {useUsuarios} from "../hooks/useUsuarios";
import { useEffect, useState } from "react";
import { useAccion } from "../../../hooks/eliminar-editar/useAccion";
import { ModalUsuarioForm } from "./ModalUsuarioForm"; 
import type { User } from "../../../types/type";
import '../style.css'

export function TablaUsuarios() {

  const { state } = useUsuarios();
  const { handleDelete, handleRestore } = useAccion();
  
  // Estado local intermedio para permitir mutaciones dinámicas (igual que en ProductList)
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEdicion, setUsuarioEdicion] = useState<User | null>(null);
   
  // Sincronizar el estado global con el estado local de la tabla
  useEffect(() => {
    if (state.status === 'success') {
      setUsuarios(state.data.data);
    }
  }, [state]);

    if (state.status === "idle" || state.status === "loading") {
      return (
        <div className="min-h-screen flex items-center justify-center text-(--on-surface)">
          Cargando usuarios...
        </div>
      );
    }

    if (state.status === "error") {
      return (
        <div className="min-h-screen flex items-center justify-center text-red-500">
          Error al cargar usuarios: {state.error}
        </div>
      );
    }

    // Funciones de actualización local del estado (Mutación fluida de la interfaz)
  const agregarUsuarioLocal = (nuevoUser: User) => {
    setUsuarios((prev) => [nuevoUser, ...prev]);
  };

  const actualizarUsuarioLocal = (id: number, datosActualizados: Partial<User>) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id_usuario === id ? { ...u, ...datosActualizados } : u))
    );
  };

  const cambiarInactivo = (id: number) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id_usuario === id ? { ...u, activo: false } : u))
    );
  };

  const cambiarActivo = (id: number) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id_usuario === id ? { ...u, activo: true } : u))
    );
  };

  // Manejadores de clics para los botones de la tabla
  const clickEliminar = async (id: number) => {
    const resp = await handleDelete('usuarios', id);
    if (resp) {
      cambiarInactivo(id);
    }
  };

  const clickRestaurar = async (id: number) => {
    const resp = await handleRestore('usuarios', id);
    if (resp) {
      cambiarActivo(id);
    }
  };


    return (
      <>
        {/* MAIN */}
          <main className="flex-1 overflow-y-auto p-3 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-4xl font-black">
                    Gestión de Usuarios
                  </h2>
                  <p className="text-sm md:text-base text-(--on-surface-variant)">
                    Administrá usuarios registrados del sistema
                  </p>
                </div>

                <button 
                onClick={() => { setUsuarioEdicion(null); setModalOpen(true); }}
                className="bg-(--primary) hover:bg-(--primary-hover) text-white px-6 py-3 rounded-xl font-bold shadow-lg transition">
                  + Nuevo Usuario
                </button>
              </div>

              

              {/* TABLA */}
              <div className="bg-(--surface-container-lowest) rounded-2xl border border-(--outline-variant) overflow-hidden glass-depth">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-(--surface-container) border-b border-(--outline-variant)">
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                          Nombre
                        </th>

                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                          Email - Usuario
                        </th>

                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                          Estado
                        </th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                          Rol
                        </th>

                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black uppercase text-center text-(--on-surface-variant)">
                          Acciones
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-(--outline-variant)">
                      {usuarios.map((usuario) => (
                        <tr
                          key={usuario.id_usuario}
                          className="hover:bg-(--surface-container-low) transition-colors"
                        >
                          <td className="px-3 md:px-6 py-3 md:py-5">
                            <div>
                              <p className="font-bold">
                                {usuario.nombre} {usuario.apellido}
                              </p>
                            
                            </div>
                          </td>

                          <td className="px-3 md:px-6 py-3 md:py-5">
                            {usuario.email}
                          </td>
                          
                          {usuario.activo  ? (
                            <td className="px-3 md:px-6 py-3 md:py-5">
                              <span className="px-3 py-1 rounded-full bg-(--success-bg) text-(--success) text-xs font-bold">
                                Activo
                              </span>
                            </td>
                          ) : (
                            <td className="px-3 md:px-6 py-3 md:py-5">
                              <span className="px-3 py-1 rounded-full bg-(--danger-bg) text-(--danger) text-xs font-bold">
                                Inactivo
                              </span>
                            </td>
                          )}

                          <td className="px-3 md:px-6 py-3 md:py-5">
                            <span className=" px-3 py-1 rounded-xl bg-(--warning-bg) text-(--warning) text-xs font-bold">
                              {usuario.rol === "customer" ? "Cliente" : usuario.rol}
                            </span>
                            
                          </td>

                          <td className="px-3 md:px-6 py-3 md:py-5">
                            <div className="flex justify-start md:justify-end gap-3">
                              {/* Botón de EDITAR */}
                              <div className="relative group">

                                <button 
                                onClick={() => { setUsuarioEdicion(usuario); setModalOpen(true); }}
                                className="size-8 rounded-lg flex items-center justify-center text-[#9c7349] hover:bg-primary/10 hover:text-primary transition-all">
                                  <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>

                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 
                                                opacity-0 group-hover:opacity-100
                                                bg-gray-800 text-white text-xs px-2 py-1 rounded
                                                transition pointer-events-none whitespace-nowrap">
                                  Editar
                                </span>
                              </div>
                              
                              {/* Botón de BORRAR */}

                              <div className="relative group">
                                {usuario.activo ? (
                                  <button 
                                  onClick={() => clickEliminar(usuario.id_usuario)}
                                  className="size-8 rounded-lg flex items-center justify-center text-[#9c7349] hover:bg-primary/10 hover:text-red-500 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                  </button>
                                ) : (
                                  <button 
                                  onClick={() => clickRestaurar(usuario.id_usuario)}
                                  className="size-8 rounded-lg flex items-center justify-center text-[#9c7349] hover:bg-primary/10 hover:text-green-500 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">restore_from_trash</span>
                                  </button>
                                )}

                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 
                                                opacity-0 group-hover:opacity-100
                                                bg-gray-800 text-white text-xs px-2 py-1 rounded
                                                transition pointer-events-none whitespace-nowrap">
                                  {usuario.activo ? 'Borrar' : 'Restaurar'}
                                </span>
                              </div>
                              
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              
            </div>
          </main>
          {/* FORMULARIO DE EDICIÓN O ALTA */}
      {modalOpen && (
        <ModalUsuarioForm
          usuario={usuarioEdicion}
          onClose={() => { setModalOpen(false); setUsuarioEdicion(null); }}
          onSuccess={(datosModificados: User | Partial<User>) => {
            if (usuarioEdicion) {
              // Si estábamos editando, mezclamos los cambios con el estado de la tabla
              actualizarUsuarioLocal(usuarioEdicion.id_usuario, datosModificados);
            } else {
              // Si es un alta nueva, lo insertamos arriba en la tabla
              agregarUsuarioLocal(datosModificados as User);
            }
          }}
        />
      )}
      </>
    );

}