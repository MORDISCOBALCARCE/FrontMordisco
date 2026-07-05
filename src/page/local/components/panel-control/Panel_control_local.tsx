import { NavLink } from "react-router-dom";
import './styles.css';
export function Panel_control_local() {
    return (
        <nav className="bg-(--surface-container-lowest) text-(--on-surface) border border-(--outline-variant) rounded-2xl p-4 shadow-sm flex flex-col gap-3">

            <NavLink
                to="/local"
                end
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl transition font-medium ${isActive
                        ? "bg-(--primary) text-white"
                        : "hover:bg-(--surface-container-low)"
                    }`
                }
            >
                Nuestros productos
            </NavLink>

            <NavLink
                to="/local/nuevoProducto"
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl transition font-medium ${isActive
                        ? "bg-(--primary) text-white"
                        : "hover:bg-(--surface-container-low)"
                    }`
                }
            >
                Agregar producto
            </NavLink>

             <NavLink
                to="/local/pedidos"
                className={({ isActive }) =>
                    `px-4 py-3 rounded-xl transition font-medium ${isActive
                        ? "bg-(--primary) text-white"
                        : "hover:bg-(--surface-container-low)"
                    }`
                }
            >
                Pedidos
            </NavLink>

        </nav>
    );
}