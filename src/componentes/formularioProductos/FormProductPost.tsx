import { useState, type FormEvent } from "react"
import { postProductos } from "../../servicio/service"
import { useApiForm } from "../../hooks/useFormDataApi"



export function FormProductPost() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState<number>()
    const [imagenFile, setImagenFile] = useState<File | null>(null)
    const [mensaje, setMensaje] = useState('');
    const{fetchAuth2} = useApiForm()
    const[categoria, setCategoria] = useState<number>()



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newProduct = new FormData();
        newProduct.append('nombre', nombre)
        newProduct.append('precio', precio!.toString())
        newProduct.append('descripcion', descripcion)
        newProduct.append('categoria_id', categoria!.toString())

        if(imagenFile){
            newProduct.append('imagen', imagenFile)
        }
        
        try {
            const resp = await postProductos(newProduct, fetchAuth2)
              console.log("POST PRODUCTO EJECUTADO");
            if (resp.code === 201) {
                alert('¡Producto creado con éxito!');
            }
            } catch (error) {
                setMensaje('Error al intentar guardar el producto.');
            }
            setDescripcion('')
            setImagenFile(null)
            setPrecio(undefined)
            setNombre('')
    }


    return (
        <>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '350px' }}>
                <h3>Formulario de Productos</h3>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="number" placeholder="Precio" value={precio || ''} onChange={(e) => setPrecio(Number(e.target.value))} required />
                <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                <input type="number" placeholder="Categoría" value={categoria || ''} onChange={(e) => setCategoria(Number(e.target.value))} required />

                <label style={{ fontWeight: 'bold' }}>Imagen del Producto:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImagenFile(e.target.files[0]); // Captura los bytes reales del archivo
                        }
                    }}
                    required
                />

                <button type="submit">Guardar Producto</button>
            </form>

        </>

    )
}