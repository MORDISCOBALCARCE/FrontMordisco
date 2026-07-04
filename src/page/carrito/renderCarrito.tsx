import { Outlet } from "react-router-dom";
import { Historial } from "../../features/pedidoPorCliente/historial";

export function RenderCarrito() {
    return(
        <>
<section>
    <aside>
        <Historial/>
    </aside>

        <article className="flex-1 min-w-0">
          <Outlet />
        </article>
        
</section>
        </>
    )
}