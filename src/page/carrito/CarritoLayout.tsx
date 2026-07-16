import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

export function CarritoLayout() {
    return (
        <>
            <section className="flex gap-6 items-start">
                <aside className="w-72 shrink-0">
                    <Sidebar />
                </aside>

                <article className="flex-1 min-w-0">
                    <Outlet />
                </article>
            </section>
        </>
    )
}