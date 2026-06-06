import { SearchProducts } from "../../componentes/BuscarProducto/BuscarProducto";
import { Categorias } from "../../componentes/Categorias/Categorias";
import { categoriasMock } from "../../data/Categorias.data";
import Promociones from "../../componentes/promociones/promociones";
import type { Producto } from "../../componentes/promociones/promociones.types";
import { productosMock } from "../../data/productos.data";
import { useState } from "react";
import { Card } from "../menu/card";
import styles from './home.module.css'

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
                {filtProducto.map((prod: Producto) => (<Card key={prod.id} producto={prod} />))}
            </section>

            <Categorias
                categorias={categoriasMock}/>
        </>
    )
}