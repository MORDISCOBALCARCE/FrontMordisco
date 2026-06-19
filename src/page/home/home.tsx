import { BuscarProductos} from "../../componentes/BuscarProducto/BuscarProducto";
import { Categorias } from "../../componentes/Categorias/Categorias";
import { categoriasMock } from "../../data/Categorias.data";
import Promociones from "../../componentes/promociones/promociones";
import { useEffect, useState } from "react";
import styles from './home.module.css'
import { useProductos } from "../../hooks/useProductos";
import type { Productos } from "../../types/type";
import { Card } from "../menu/card";


export default function Home() {
    const { state } = useProductos();
    const [filter, setFilter] = useState<Productos[]>([]);


    useEffect(() => { setFilter([]) }, [state])

    if (state.status === 'idle' || state.status === 'loading') {
        return <p>Cargando productos...</p>
    }
    if (state.status === 'error') {
        return <p>Error al cargar los productos: {state.status}</p>
    }



    const handleSearch = (buscar: string) => {
        if (buscar.trim() === '') {
            return
        }
        const prodFilter = state.data.data.filter((p) => (p.nombre.toLowerCase().trim().includes(buscar.toLowerCase())))
        setFilter(prodFilter)
    };


    return (
        <>
            <Promociones />
            <BuscarProductos onSearch={handleSearch} />

            <section className={styles.cont_card_home}>
                <div className={styles.cont_prod}>

                    {filter.map((prod: Productos) => (
                        <Card key={prod.id_producto} producto={prod} />))
                    }
                </div>
            </section>

            <Categorias categorias={categoriasMock} />
        </>
    )
}