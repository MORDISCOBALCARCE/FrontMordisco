
import {useLocales} from "../hooks/useLocales";
import {useState} from "react";
import '../style.css'

export function TablaLocales() {

  const { state } = useLocales();
  const [modalOpen, setModalOpen] = useState(false);

    if (state.status === "idle" || state.status === "loading") {
      return (
        <div className="min-h-screen flex items-center justify-center text-(--on-surface)">
          Cargando Locales...
        </div>
      );
    }

    if (state.status === "error") {
      return (
        <div className="min-h-screen flex items-center justify-center text-red-500">
          Error al cargar locales
        </div>
      );
    }
    return (
      <>
        {/* MAIN */}
          <main className="flex-1 overflow-y-auto p-3 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-4xl font-black">
                    Gestión de Locales
                  </h2>
                 <p className="text-sm md:text-base text-(--on-surface-variant)">
                    Administrá locales registrados del sistema
                  </p>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-(--primary) hover:bg-(--primary-hover) text-white px-6 py-3 rounded-xl font-bold shadow-lg transition">
                  + Nuevo Local
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
                          Tipo Local
                        </th>

                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                          Estado
                        </th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black uppercase text-(--on-surface-variant)">
                          Dirección
                        </th>

                        
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-(--outline-variant)">
                      {state.data.data.map((local) => (
                        <tr
                          key={local.id_local}
                          className="hover:bg-(--surface-container-low) transition-colors"
                        >
                          <td className="px-3 md:px-6 py-3 md:py-5">
                            <div>
                              <p className="font-bold">
                                {local.nombre_comercial}
                              </p>
                            
                            </div>
                          </td>

                          <td className="px-3 md:px-6 py-3 md:py-5">
                            {local.tipoLocal}
                          </td>
                          
                          {local.activo  ? (
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
                            
                              {local.direccion}
                          
                          </td>

                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              
            </div>
          </main>
           {/* MODAL */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-100 max-w-[90%]">
                
                <h3 className="text-2xl font-bold mb-4">
                  Agregar Nuevo Local
                </h3>

                <p className="text-gray-600 mb-6">
                  Para agregar un nuevo local, por favor contáctese con el Administrador.
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="bg-(--primary) text-white px-5 py-2 rounded-xl font-bold hover:bg-(--primary-hover) transition"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
      </>
    );

}