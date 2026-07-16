import { useState, type FormEvent } from "react"
import { postProductos } from "./service/service"
import { useApiForm } from "./hooks/useFormDataApi"
import Swal from 'sweetalert2'

export function FormProductPost() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState<number>()
    const [imagenFile, setImagenFile] = useState<File | null>(null)
    const [error, setError] = useState('');
    const { fetchAuthMedia } = useApiForm()
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
            const resp = await postProductos(newProduct, fetchAuthMedia)
            if (resp.code === 201) {
                Swal.fire("Producto Creado con éxito");
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
        <section className="max-w-3xl mx-auto">
            <div className="bg-(--surface-container-low) border border-(--outline-variant) rounded-2xl glass-depth p-8">

                <div className="mb-6 border-b border-(--outline-variant)/30 pb-4">
                    <h2 className="text-2xl font-black text-(--on-surface)">
                        🍽️ Nuevo Producto
                    </h2>
                    <p className="text-sm text-(--on-surface-variant) mt-1">
                        Completa la información para agregar un producto al menú.
                    </p>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-500 font-semibold">
                        ❌ {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* Nombre */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-(--on-surface-variant)">
                            Nombre del producto
                        </label>

                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Hamburguesa Completa"
                            required
                            className="w-full rounded-xl border border-(--outline-variant)
            bg-(--surface-container-lowest)
            px-4 py-3
            text-(--on-surface)
            placeholder:text-(--on-surface-variant)
            focus:outline-none
            focus:ring-2
            focus:ring-(--primary)"
                        />
                    </div>

                    {/* Precio y Categoría */}
                    <div className="grid md:grid-cols-2 gap-5">

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-(--on-surface-variant)">
                                Precio
                            </label>

                            <input
                                type="number"
                                value={precio || ""}
                                onChange={(e) => setPrecio(Number(e.target.value))}
                                placeholder="$ 0"
                                required
                                className="w-full rounded-xl border border-(--outline-variant)
              bg-(--surface-container-lowest)
              px-4 py-3
              text-(--on-surface)
              focus:outline-none
              focus:ring-2
              focus:ring-(--primary)"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-(--on-surface-variant)">
                                Categoría
                            </label>

                            <select
                                value={categoria || ""}
                                onChange={(e) => setCategoria(Number(e.target.value))}
                                required
                                className="w-full rounded-xl border border-(--outline-variant)
              bg-(--surface-container-lowest)
              px-4 py-3
              text-(--on-surface)
              focus:outline-none
              focus:ring-2
              focus:ring-(--primary)"
                            >
                                <option value="" disabled hidden>
                                    Selecciona una categoría
                                </option>

                                <option value={1}>🍽️ Al plato</option>
                                <option value={2}>🥤 Bebidas</option>
                                <option value={3}>🍰 Postres</option>
                                <option value={4}>🍕 Pizza</option>
                                <option value={5}>🍔 Hamburguesas</option>
                                <option value={6}>🍴 Otros</option>
                            </select>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-(--on-surface-variant)">
                            Descripción
                        </label>

                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                            rows={5}
                            placeholder="Describe el producto..."
                            className="w-full resize-none rounded-xl border border-(--outline-variant)
            bg-(--surface-container-lowest)
            px-4 py-3
            text-(--on-surface)
            placeholder:text-(--on-surface-variant)
            focus:outline-none
            focus:ring-2
            focus:ring-(--primary)"
                        />
                    </div>

                    {/* Imagen */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-(--on-surface-variant)">
                            Imagen del producto
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setImagenFile(e.target.files[0]);
                                }
                            }}
                            className="block w-full text-sm
            text-(--on-surface-variant)
            file:mr-4
            file:rounded-xl
            file:border-0
            file:bg-(--primary)
            file:px-5
            file:py-2.5
            file:text-white
            file:font-bold
            hover:file:bg-(--primary-hover)
            cursor-pointer"
                        />
                    </div>

                    {/* Botón */}
                    <div className="flex justify-end pt-3 border-t border-(--outline-variant)/30">

                        <button
                            type="submit"
                            className="px-7 py-3 rounded-xl
            bg-(--primary)
            hover:bg-(--primary-hover)
            text-white
            font-bold
            shadow-md
            transition
            squishy-btn"
                        >
                            Guardar Producto
                        </button>

                    </div>
                </form>

            </div>
        </section>
    );

}