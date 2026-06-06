import { useNavigate, useParams } from "react-router-dom"
import type { Producto } from "../../promociones/promociones.types";
import { useState } from "react";
import { productosMock } from "../../../data/productos.data";
import { Card } from "../../../page/menu/card";
import styles from './cate.module.css'


export function CategoNombre() {

    const { nombre } = useParams()
    const navigate = useNavigate()
    const [producto] = useState<Producto[]>(productosMock);

    const filtro = producto.filter(pro => pro.categoria === nombre)

    console.log(filtro)
    return (
        <section className={styles.cont_categ}>
            <h1 className="text-2xl font-extrabold mb-6 text-accent-brown dark:text-orange-100 uppercase tracking-wider">Categoria</h1>
            <h2 className="text-2xl font-extrabold mb-6 text-accent-brown dark:text-orange-100 uppercase tracking-wider">{nombre}</h2>

            <div className={styles.card_categ}>

                {filtro.map((p) => (
                    <Card key={p.id} producto={p} />
                ))}
            </div>
            <button className={styles.btn_volver} onClick={() => { navigate('/') }}>Volver</button>
        </section>
    )
}