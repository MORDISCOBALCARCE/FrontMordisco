
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext"
import { Panel_control_local } from "./components/panel-control/Panel_control_local";

export function MiLocal() {
  const { user } = useAuth();

  return (
    <>
    <div className="p-4 md:p-4  ">
      <header className="mb-6">
        <h1 className="text-lg font-black">
          Bienvenido:
          <span className="ml-2 text-xs text-(--on-surface-variant)">
            {user?.nombre}
          </span>
        </h1>

      </header>

      <section className="flex gap-6 items-start">
        <aside className="w-72 shrink-0">
          <Panel_control_local />
        </aside>

        <article className="flex-1 min-w-0">
          <Outlet />
        </article>
      </section>

    </div>
    </>

  )
}