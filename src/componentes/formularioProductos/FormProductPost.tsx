import { useState, type FormEvent } from "react"
import { postProductos } from "../../servicio/service"
import { useApiForm } from "../../hooks/useFormDataApi"
import styles from './styles.module.css';


export function FormProductPost() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState<number>()
    const [imagenFile, setImagenFile] = useState<File | null>(null)
    const [error, setError] = useState('');
    const { fetchAuth2 } = useApiForm()
    const [categoria, setCategoria] = useState<number>()



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newProduct = new FormData();
        newProduct.append('nombre', nombre)
        newProduct.append('precio', precio!.toString())
        newProduct.append('descripcion', descripcion)
        newProduct.append('categoria_id', categoria!.toString())

        if (imagenFile) {
            newProduct.append('imagen', imagenFile)
        }

        try {
            const resp = await postProductos(newProduct, fetchAuth2)
            if (resp.code === 201) {
                alert('¡Producto creado con éxito!');
            }
        } catch (error) {
            setError('Error al intentar guardar el producto.');
        }
        setDescripcion('')
        setImagenFile(null)
        setPrecio(undefined)
        setNombre('')
    }


    return (
        <>

        {error && (
            <p>{error}</p>
        )}
            <form onSubmit={handleSubmit} className={styles.cont_form}>
                <h2>Agregar producto</h2>

                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="number" placeholder="Precio" value={precio || ''} onChange={(e) => setPrecio(Number(e.target.value))} required />
                <label >Descripcion</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required className={styles.inputText} />
                <input type="number" placeholder="Categoría" value={categoria || ''} onChange={(e) => setCategoria(Number(e.target.value))} required />

                <label >Imagen del Producto</label>
                <input className={styles.selec_img}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImagenFile(e.target.files[0]); // Captura los bytes reales del archivo
                        }
                    }}
                    required
                />
                <div className={styles.btn}>
                    <button type="submit">Guardar Producto</button>
                </div>
            </form>


        </>

    )
}