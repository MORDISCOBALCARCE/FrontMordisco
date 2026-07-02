
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext"
import { Panel_control_local } from "./components/panel-control/Panel_control_local";

export function MiLocal() {
  const { user } = useAuth();

  return (
    <>
      <header className="mb-6">
        <h1 className="text-lg font-black">
          Bienvenido:
          <span className="ml-2 text-xs text-(--on-surface-variant)">
            {user?.nombre}
          </span>
        </h1>

        <h2 className="mt-2 text-2xl font-bold">
          Nuestros Productos
        </h2>
      </header>

      <section className="flex gap-6 items-start">
        <aside className="w-72 shrink-0">
          <Panel_control_local />
        </aside>

        <article className="flex-1 min-w-0">
          <Outlet />
        </article>
      </section>


    </>

  )
}