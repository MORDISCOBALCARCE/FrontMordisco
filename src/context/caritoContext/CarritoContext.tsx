import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CarritoContextType, ItemCarrito } from "./typeCarrito";
import type { Productos } from "../../types/type";


const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

interface props {
    children: ReactNode
}

export const CarritoProvider = ({ children }: props) => {
    const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {

        const data = localStorage.getItem('carrito');
        return data ? JSON.parse(data) : []
    });

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);


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