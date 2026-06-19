import { useUsuarios } from "./hooks/useUsuarios";
import './style.css'

export function Administrador() {
  const { state } = useUsuarios();

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
        Error al cargar usuarios
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--background) text-(--on-surface)">
      <div className="flex h-screen overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-72 bg-(--surface-container-lowest) border-r border-(--outline-variant) flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="bg-(--primary) size-10 rounded-xl flex items-center justify-center text-white font-bold">
              A
            </div>

            <div>
              <h1 className="text-lg font-black">Admin Panel</h1>
              <p className="text-xs text-(--on-surface-variant)">
                Gestión de usuarios
              </p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-(--primary)/10 text-(--primary) font-bold">
              Usuarios
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-(--surface-container-low) transition">
              Configuración
            </button>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black">
                  Gestión de Usuarios
                </h2>
                <p className="text-(--on-surface-variant)">
                  Administrá usuarios registrados del sistema
                </p>
              </div>

              <button className="bg-(--primary) hover:bg-(--primary-hover) text-white px-6 py-3 rounded-xl font-bold shadow-lg transition">
                + Nuevo Usuario
              </button>
            </div>

            

            {/* TABLA */}
            <div className="bg-(--surface-container-lowest) rounded-2xl border border-(--outline-variant) overflow-hidden glass-depth">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-(--surface-container) border-b border-(--outline-variant)">
                      <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                        Nombre
                      </th>

                      <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                        Email - Usuario
                      </th>

                      <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                        Rol
                      </th>

                      <th className="px-6 py-4 text-xs font-black uppercase text-center text-(--on-surface-variant)">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-(--outline-variant)">
                    {state.data.data.map((usuario) => (
                      <tr
                        key={usuario.id_usuario}
                        className="hover:bg-(--surface-container-low) transition-colors"
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-bold">
                              {usuario.nombre} {usuario.apellido}
                            </p>
                           
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          {usuario.email}
                        </td>
                        
                        {usuario.activo  ? (
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 rounded-full bg-(--success-bg) text-(--success) text-xs font-bold">
                              Activo
                            </span>
                          </td>
                        ) : (
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 rounded-full bg-(--danger-bg) text-(--danger) text-xs font-bold">
                              Inactivo
                            </span>
                          </td>
                        )}

                        <td className="px-6 py-5">
                          <span className=" px-3 py-1 rounded-xl bg-(--warning-bg) text-(--warning) text-xs font-bold">
                            {usuario.rol === "customer" ? "Cliente" : usuario.rol}
                          </span>
                          
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-3">
                            <button className="px-4 py-2 rounded-xl bg-orange-100 text-(--primary) hover:scale-105 transition">
                              Editar
                            </button>

                            <button className="px-4 py-2 rounded-xl bg-red-100 text-red-500 hover:scale-105 transition">
                              Eliminar
                            </button>
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
      </div>
    </div>
  );
}