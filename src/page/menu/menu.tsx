import { Card } from "./components/card"
import { useEffect, useState } from "react"
import styles from './menu.module.css'
import { useProductos } from "../../hooks/useProductos"
import type { Productos } from "../../types/type"


export default function Menu() {
    const { state } = useProductos();

    const product = state.status === 'success' ? state.data.data : []

    const [filtcategoria, setFiltCategoria] = useState<Productos[]>([])
    const [catSelec, setCateSelec] = useState('')

    useEffect(() => { 

        const activos = product.filter((p) =>(p.activo === true))
        setFiltCategoria(activos) }, [product])

    function selCategoria(cat: string) {
        setCateSelec(cat)
        const select = product.filter((prod) => prod.categoria?.nombre.includes(cat) && prod.activo === true)
        setFiltCategoria(select)

    }

    return (
        <article className={styles.art_menu}>
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-12" >
                        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                            
                            <button onClick={() => selCategoria('Otros')}  
                            className={`px-6 py-2 rounded-full whitespace-nowrap border transition-colors ${catSelec === 'Otros'
                            ? 'bg-primary text-white border-primary font-semibold'
                            : 'bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700'}`}>Otros</button>

                            <button onClick={() => selCategoria('Hamburguesas')} className={`px-6 py-2 rounded-full whitespace-nowrap border transition-colors ${catSelec === 'Hamburguesas'
                            ? 'bg-primary text-white border-primary font-semibold'
                            : 'bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700'}`}>Hamburguesas</button>

                            <button onClick={() => selCategoria('Bebidas')} className={`px-6 py-2 rounded-full whitespace-nowrap border transition-colors ${catSelec === 'Bebidas'
                            ? 'bg-primary text-white border-primary font-semibold'
                            : 'bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700'}`}>Bebidas</button>

                            <button onClick={() => selCategoria('Postres')} className={`px-6 py-2 rounded-full whitespace-nowrap border transition-colors ${catSelec === 'Postres'
                            ? 'bg-primary text-white border-primary font-semibold'
                            : 'bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700'}`}>Postres</button>

                            <button onClick={() => selCategoria('Pizza')} className={`px-6 py-2 rounded-full whitespace-nowrap border transition-colors ${catSelec === 'Pizza'
                            ? 'bg-primary text-white border-primary font-semibold'
                            : 'bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700'}`}>Pizzas</button>

                            <button onClick={() => selCategoria('Al plato')} className={`px-6 py-2 rounded-full whitespace-nowrap border transition-colors ${catSelec === 'Al plato'
                            ? 'bg-primary text-white border-primary font-semibold'
                            : 'bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700'}`}>Platos</button>
                        </div>
                        <h2 className="text-2xl font-extrabold mb-6 text-accent-brown dark:text-orange-100 uppercase tracking-wider">Menú</h2>
                        
                        <div className={styles.cont_card_menu}>
                            {filtcategoria.map((prod: Productos) => (<Card key={prod.id_producto} producto={prod} />))}
                        </div>
                    </div>
                </div>
            </main>
        </article>
    )
}