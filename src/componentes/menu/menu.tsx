import { Card } from "./card"
import { productosMock } from "../../data/productos.data"
import type { Producto } from "../promociones/promociones.types"
import { useState } from "react"
import styles from './menu.module.css'


export default function Menu() {
    const [producto] = useState<Producto[]>(productosMock);
    const [filtcategoria, setFiltCategoria] = useState<Producto[]>(productosMock)

 
        function selCategoria(cat: string) {
            const select = producto.filter((prod: Producto) => prod.categoria.includes(cat))
            setFiltCategoria(select)
        }
    

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12" >
                    <div className="flex gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                        <button onClick={()=> selCategoria('')} className="px-6 py-2 bg-primary text-white font-bold rounded-full shadow-lg shadow-orange-500/20 whitespace-nowrap">Todo</button>
                        <button onClick={()=> selCategoria('Comidas')} className="px-6 py-2 bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 font-semibold rounded-full whitespace-nowrap hover:border-primary transition-colors">Comidas</button>
                        <button onClick={()=> selCategoria('Bebidas')} className="px-6 py-2 bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 font-semibold rounded-full whitespace-nowrap hover:border-primary transition-colors">Bebidas</button>
                        <button onClick={()=> selCategoria('Postres')} className="px-6 py-2 bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 font-semibold rounded-full whitespace-nowrap hover:border-primary transition-colors">Postres</button>
                        <button onClick={()=> selCategoria('Pizza')} className="px-6 py-2 bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 font-semibold rounded-full whitespace-nowrap hover:border-primary transition-colors">Pizza</button>
                    </div>
                    <h2 className="text-2xl font-extrabold mb-6 text-accent-brown dark:text-orange-100 uppercase tracking-wider">Menú del Día</h2>
                    <div className={styles.cont_card_menu}>
                        {filtcategoria.map((prod: Producto)=>(<Card key={prod.id} producto={prod} />))}
                    </div>
                </div>
            </div>
        </main>
    )
}