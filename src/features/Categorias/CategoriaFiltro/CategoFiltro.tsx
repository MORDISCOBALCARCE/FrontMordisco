import { useNavigate, useParams } from "react-router-dom"
import styles from './cate.module.css'
import { useEffect, useState } from "react"
import type { FetchState, Productos } from "../../../types/type"
import { getCatProd } from "./service"
import { Card } from "../../../page/menu/components/card"


export function CategoFiltro() {
    const { nombre } = useParams<{ nombre: string }>()
    const navigate = useNavigate()
    const [state, setState] = useState<FetchState<Productos[]>>({ status: 'idle' })

    useEffect(() => {

        if(!nombre ) return; //si el usuario desde la url quiere esribir categoria/:"cualquiera". este if no lo va a dejar

        const controller = new AbortController()
        const filCatego = async () => {

            setState({status:'loading'})
            try {    
                const resp = await getCatProd(nombre, controller)
                const data = resp.data
                setState({ status: 'success', data: data })
            } catch (error) {
                if(error instanceof Error  && error.name === 'AbortError'){
                    setState({status:'error', error:'Erro al cargar los productos'})
                }
            }
        }
        filCatego()
        return ()=>{controller.abort()}
    }, [])

    if (state.status === 'idle' || state.status === 'loading') {
        return <p>Cargando</p>
    }
    if (state.status === 'error') {
        return <p>{state.error}</p>
    }

    return (
        <section className={styles.cont_categ}>
            <h1 className="text-2xl font-extrabold mb-6 text-accent-brown dark:text-orange-100 uppercase tracking-wider">Categoría</h1>
            <h2 className="text-2xl font-extrabold mb-6 text-accent-brown dark:text-orange-100 uppercase tracking-wider">{nombre}</h2>

            <div className={styles.card_categ}>
                {
                    state.data.map((pr) => (<Card key={pr.id_producto} producto={pr} />))
                }

            </div>
            <button className={styles.btn_volver} onClick={() => { navigate('/') }}>Volver</button>
        </section>
    )
}