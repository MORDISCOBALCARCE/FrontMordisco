import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

export function CarritoLayout() {
    return(
        <>
<section>
    <aside>
        <Sidebar/>
    </aside>

        <article className="flex-1 min-w-0">
          <Outlet />
        </article>
        
</section>
        </>
    )
}