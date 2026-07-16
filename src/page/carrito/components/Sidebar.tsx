import { NavLink } from "react-router-dom";

export function Sidebar() {

    return (
        <nav
            className=" mt-4 ml-2 bg-(--surface-container-lowest) text-(--on-surface) border border-(--outline-variant) rounded-2xl p-4 shadow-sm flex flex-col gap-3 "
        >

            <NavLink
                to="/carrito/pedidos"
                className={({ isActive }) =>
                    ` px-4 py-3 rounded-xl transition font-semibold flex items-center gap-3

                    ${ isActive  ?
                        ` bg-(--primary) text-white shadow-md `
                        :
                        ` text-(--on-surface) hover:bg-(--surface-container-low) `
                    }
                    `
                }
            >
                <span className="material-symbols-outlined">
                    receipt_long
                </span>

                Historial
            </NavLink>


            <NavLink
                to="/carrito"
                end
                className={({ isActive }) =>
                    ` px-4 py-3 rounded-xl transition font-semibold flex items-center gap-3
                    
                ${isActive 
                        ? `bg-(--primary) text-white shadow-md`
                        : `text-(--on-surface) hover:bg-(--surface-container-low)`
                    }
                    
                    `
                }
            >
                <span className="material-symbols-outlined">
                    shopping_cart
                </span>
                Mi carrito
            </NavLink>
        </nav>
    )
}