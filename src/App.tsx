import { SearchProducts } from "./componentes/BuscarProducto/BuscarProducto";


function App() {
   const handleSearch = (buscar: string) => {
    console.log("Buscando:", buscar);
  };

  return (
    <><h1>esto es dev...sapeeeeeee</h1>
      <h3>Productos</h3>
      <SearchProducts onSearch={handleSearch} />
    </>
  )
}

export default App
