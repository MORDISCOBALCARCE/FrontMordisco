import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CarritoContextType, ItemCarrito } from "./typeCarrito";
import type { Productos } from "../../types/type";
import { useAuth } from "../AuthContext/AuthContext";


const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

interface props {
    children: ReactNode
}

export const CarritoProvider = ({ children }: props) => {
    const {user} = useAuth();

    // Definimos una clave dinámica basada en el ID del usuario[cite: 2]
    const localStorageKey = user ? `carrito_user_${user.id}` : null;

    // Inicializamos el carrito vacío. Ahora la carga se manejará en un useEffect 
    // para reaccionar correctamente cada vez que cambie el usuario.
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

    // Efecto 1: Cargar el carrito del localStorage cuando el usuario cambie (Login / Logout)[cite: 1]
    useEffect(() => {
        if (localStorageKey) {
            const data = localStorage.getItem(localStorageKey);
            setCarrito(data ? JSON.parse(data) : []);
        } else {
            // Si no hay usuario logueado, vaciamos el estado en memoria
            setCarrito([]);
        }
    }, [localStorageKey]); // Se ejecuta cada vez que el usuario cambia o se desloguea[cite: 1]


    // Efecto 2: Guardar en localStorage solo si el usuario está logueado y el carrito cambia[cite: 4]
    useEffect(() => {
        if (localStorageKey) {
            localStorage.setItem(localStorageKey, JSON.stringify(carrito));
        }
    }, [carrito, localStorageKey]);


    const agregarAlCarrito = (producto: Productos, cantidad = 1, observaciones?: string) => {
        setCarrito((prev) => {
            const itemExist = prev.find((item) => item.producto.id_producto === producto.id_producto)
            if (itemExist) {
                return prev.map((item) =>
                    item.producto.id_producto === producto.id_producto ? { ...item, cantidad: item.cantidad + cantidad, observaciones } : item)
            }

            return [...prev, { producto, cantidad, observaciones }]
        })
    }


    const eliminarDelCarrito = (id: number) => {
        setCarrito((prev) =>
        prev
            .map((item) => {
                if (item.producto.id_producto === id) {
                    return {
                        ...item,
                        cantidad: item.cantidad - 1
                    };
                }

                return item;
            })
            .filter((item) => item.cantidad > 0)
    )
    }


    const limpiarCarrito = () =>{
        localStorage.removeItem('carrito')
        setCarrito([]);
    }
    const totalPrecio = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito,  limpiarCarrito, eliminarDelCarrito, totalPrecio }}>
            {children}
        </CarritoContext.Provider>
    )

}

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
    return context;
};