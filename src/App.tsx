import { SearchProducts } from "./componentes/BuscarProducto/BuscarProducto";
import{BrowserRouter,Routes, Route} from 'react-router-dom';
import Navbar from "./componentes/nav-bar/Navbar";
import Login from "./componentes/Login/Login";  
import Footer from "./componentes/Footer/Footer";
import { categoriasMock } from "./componentes/Categorias/Categorias.data";
import { type Categoria } from "./componentes/Categorias/Categorias.types";
import { Categorias } from "./componentes/Categorias/Categorias";

function App() {
   const handleSearch = (buscar: string) => {
    console.log("Buscando:", buscar);
  };

  const handleCategoria = (cat: Categoria) => {
      console.log("Categoría seleccionada:", cat);
    };

  return (
    <>
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-secondary dark:text-gray-100 transition-colors duration-300">
    <BrowserRouter>
    <Navbar/>

    <main className="conte-main pt-20 px-4">

        <Routes>
          <Route path="/" element={
        <div>
        <h3>Productos</h3>
        <SearchProducts onSearch={handleSearch} />
        </div>
          }/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<h1>Bienvenido 👋</h1>} />
        </Routes>
        <Categorias
         categorias={categoriasMock}
            onSelectCategoria={handleCategoria}/>
    </main>
        <Footer/>
    </BrowserRouter>
 </div>
    </>
  )
}

export default App
