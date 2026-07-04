import { NavLink } from "react-router-dom";

    export function Historial(){

        return(
            <nav className="bg-(--surface-container-lowest) text-(--on-surface) border border-(--outline-variant) rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            
                <NavLink
                    to="/carrito/pedidos">
                    Historial
                </NavLink>
            
                <NavLink
                    to="/carrito">
                    Mi carrito
                </NavLink>
            </nav>
            
        )
    }