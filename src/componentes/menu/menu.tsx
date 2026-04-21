import { Card } from "./card"
import { productosMock } from "../../data/productos.data"
import type { Producto } from "../promociones/promociones.types"
import { useSearch,useFilter,useLoad } from "../../hooks/useFilter"


export default function Menu(){

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8" >
                    <div className="flex gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                        <button className="px-6 py-2 bg-primary text-white font-bold rounded-full shadow-lg shadow-orange-500/20 whitespace-nowrap">Todo</button>
                        <button className="px-6 py-2 bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 font-semibold rounded-full whitespace-nowrap hover:border-primary transition-colors">Comidas</button>
                        <button className="px-6 py-2 bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 font-semibold rounded-full whitespace-nowrap hover:border-primary transition-colors">Bebidas</button>
                        <button className="px-6 py-2 bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 font-semibold rounded-full whitespace-nowrap hover:border-primary transition-colors">Postres</button>
                        <button className="px-6 py-2 bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 font-semibold rounded-full whitespace-nowrap hover:border-primary transition-colors">Pizza</button>
                    </div>
                    <h2 className="text-2xl font-extrabold mb-6 text-accent-brown dark:text-orange-100 uppercase tracking-wider">Menú del Día</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {useLoad()}
                    </div>
                </div>
            </div>
        </main>
    )
}