import { useState } from "react";
import { useAuth } from "../../../context/AuthContext/AuthContext"
import { useCarrito } from "../../../context/CarritoContext/CarritoContext";
import type { Productos } from "../../../types/type"

export const url_imagen = "http://localhost:3000/uploads/"

interface Props {
    producto: Productos
}

export function Card({ producto }: Props) {
    const [notificacion, setNotificacion] = useState<string | null>(null);
    const { isAuthenticate } = useAuth();
    const { agregarAlCarrito } = useCarrito();

    const handleAgregar = () => {
        if (!isAuthenticate) {
            setNotificacion("¡Debes iniciar sesión para poder comprar productos!");
            setTimeout(() => setNotificacion(null), 3000);
            return;
        }

        agregarAlCarrito(producto);
        setNotificacion(`${producto.nombre} agregado al carrito.`);
        setTimeout(() => setNotificacion(null), 3000);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary/20 flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
                <img alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={`${url_imagen}${producto.imagen}`} />
                <div className="absolute top-4 right-4 bg-primary text-white font-bold px-3 py-1 rounded-full shadow-lg">${producto.precio}</div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 dark:text-white">{producto.nombre}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{producto.descripcion}</p>
                {/* <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{producto.categoria?.nombre}</p> */}

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-orange-500">
                        <span className="material-symbols-outlined text-sm fill-current">star</span>
                        <span className="text-sm font-bold">{Math.floor(Math.random() * 5)}</span>
                    </div>

                    <button
                        onClick={handleAgregar}
                        className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white w-9 h-9 rounded-full transition-all shadow-md active:scale-95">
                        <span className="material-symbols-outlined flex items-center justify-center leading-none h-full w-full">+</span >
                    </button>

                </div>
            </div>
            
            <div className="px-6 text-center mt-2 animate-fade-in">
                {notificacion && (
                    <span className={`text-xs font-semibold ${isAuthenticate ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                        {notificacion}
                    </span>
                )}

            </div>
        </div>
    )
}