import { SearchProducts } from "./componentes/BuscarProducto/BuscarProducto";
import{BrowserRouter,Routes, Route} from 'react-router-dom';
import Navbar from "./componentes/nav-bar/Navbar";
import Login from "./componentes/Login/Login";  
import Footer from "./componentes/Footer/Footer";

function App() {
   const handleSearch = (buscar: string) => {
    console.log("Buscando:", buscar);
  };

  return (
    <>
    <BrowserRouter>
    <Navbar/>

    <main className="conte-main">

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

    </main>
        <Footer/>
    </BrowserRouter>

    </>
  )
}

export default App
