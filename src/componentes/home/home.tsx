import { SearchProducts } from "../BuscarProducto/BuscarProducto";
import { type Categoria } from "../Categorias/Categorias.types";
import { Categorias } from "../Categorias/Categorias";
import Hamburgesa from "../hamburguesa/hamburgesa";
import { categoriasMock } from "../../data/Categorias.data";
import Promociones from "../promociones/promociones";

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
            <Promociones />
            <Categorias
                categorias={categoriasMock}
                onSelectCategoria={handleCategoria}/>
        </>
    )
}