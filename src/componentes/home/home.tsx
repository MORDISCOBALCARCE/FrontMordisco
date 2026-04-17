import { SearchProducts } from "../BuscarProducto/BuscarProducto";
import { categoriasMock } from "../Categorias/Categorias.data";
import { type Categoria } from "../Categorias/Categorias.types";
import { Categorias } from "../Categorias/Categorias";
import Hamburgesa from "../hamburguesa/hamburgesa";

export default function Home(){
    const handleSearch = (buscar: string) => {
        console.log("Buscando:", buscar);
    };
    const handleCategoria = (cat: Categoria) => {
        console.log("Categoría seleccionada:", cat);
    };
    return (
        <>
            <Hamburgesa />
            <SearchProducts onSearch={handleSearch} />
            <Categorias
                categorias={categoriasMock}
                onSelectCategoria={handleCategoria}/>
        </>
    )
}