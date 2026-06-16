import { SearchProducts } from "../../componentes/BuscarProducto/BuscarProducto";
import { Categorias } from "../../componentes/Categorias/Categorias";
import { categoriasMock } from "../../data/Categorias.data";
import Promociones from "../../componentes/promociones/promociones";
import type { Producto } from "../../componentes/promociones/promociones.types";
import { productosMock } from "../../data/productos.data";
import { useState } from "react";

import styles from './home.module.css'
import { Card2 } from "./Card2";

export default function Home() {
    const [producto] = useState<Producto[]>(productosMock);
    const [filtProducto, setFiltProducto] = useState<Producto[]>([])


    const handleSearch = (buscar: string) => {
       if(buscar != ""){
           const resultBusquedo = producto.filter((prod: Producto) => prod.titulo.toLowerCase().trim().includes(buscar.toLowerCase().trim()));
           setFiltProducto(resultBusquedo)
       } 

    };


    return (
        <>
            <Promociones />
            <SearchProducts onSearch={handleSearch} />
            
            <section className={styles.cont_card_home}>
                {filtProducto.map((prod: Producto) => (<Card2 key={prod.id} producto={prod} />))}
            </section>

            <Categorias
                categorias={categoriasMock}/>
        </>
    )
}