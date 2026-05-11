import { SearchProducts } from "../BuscarProducto/BuscarProducto";
import { type Categoria } from "../Categorias/Categorias.types";
import { Categorias } from "../Categorias/Categorias";
import { categoriasMock } from "../../data/Categorias.data";
import Promociones from "../promociones/promociones";
import type { Producto } from "../promociones/promociones.types";
import { productosMock } from "../../data/productos.data";
import { useState } from "react";
import { Card } from "../menu/card";
import styles from './home.module.css'

export default function Home() {
    const [producto] = useState<Producto[]>(productosMock);
    const [filtProducto, setFiltProducto] = useState<Producto[]>([])


    const handleSearch = (buscar: string) => {
        const resultBusquedo = producto.filter((prod: Producto) => prod.titulo.toLowerCase().trim().includes(buscar.toLowerCase().trim()));
        setFiltProducto(resultBusquedo)
    };

    const handleCategoria = (categoria: Categoria) => {
        console.log('Categoria seleccionada', categoria)
    };
    return (
        <>
            <Promociones />
            <SearchProducts onSearch={handleSearch} />
            
            <section className={styles.cont_card_home}>
                {filtProducto.map((prod: Producto) => (<Card key={prod.id} producto={prod} />))}
            </section>

            <Categorias
                categorias={categoriasMock}
                onSelectCategoria={handleCategoria} />
        </>
    )
}