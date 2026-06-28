import type { Dispatch, SetStateAction } from "react";

interface Props {
  vistaActiva: "usuarios" | "locales";
  setVistaActiva: Dispatch<SetStateAction<"usuarios" | "locales">>;
}

export function SideBarAdmin({
  vistaActiva,
  setVistaActiva,
}: Props) {
  return (
     <>
        <aside className="w-full md:w-72 h-auto md:h-full bg-(--surface-container-lowest) border-b md:border-b-0 md:border-r border-(--outline-variant) flex flex-col">
      
      {/* Header */}
      <div className="p-3 md:p-6 flex items-center gap-3">
        <div className="bg-(--primary) size-10 rounded-xl flex items-center justify-center text-white font-bold">
          A
        </div>

        <div>
          <h1 className="text-lg font-black">Admin Panel</h1>
          <p className="text-xs text-(--on-surface-variant)">
            Gestión del sistema
          </p>
        </div>
      </div>

      {/* Menú */}
      <nav className="flex flex-col gap-2 px-3 py-3 md:px-4 md:py-4">
        <button
          onClick={() => setVistaActiva("usuarios")}
          className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-xl transition ${
            vistaActiva === "usuarios"
              ? "bg-(--primary)/10 text-(--primary) font-bold"
              : "hover:bg-(--surface-container-low)"
          }`}
        >
          Usuarios
        </button>

        <button
          onClick={() => setVistaActiva("locales")}
          className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-xl transition ${
            vistaActiva === "locales"
              ? "bg-(--primary)/10 text-(--primary) font-bold"
              : "hover:bg-(--surface-container-low)"
          }`}
        >
          Locales
        </button>

       
      </nav>
    </aside>
    </>
  );
}