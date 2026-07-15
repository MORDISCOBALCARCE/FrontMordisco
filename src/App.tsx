import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from "./features/Navbar/Navbar";
import Login from "./features/Login/Login";
import Footer from "./features/Footer/Footer";
import Home from "./page/home/home";
import { useThemeMode } from './hooks/useThemeMode';
import Menu from './page/menu/menu';
import { CategoFiltro } from './features/Categorias/CategoriaFiltro/CategoFiltro';
import { ContextProvider } from './context/AuthContext/AuthContext';
import { ProtectedRoute } from './features/Auth/protectedRoute';
import { PublicRoute } from './features/Auth/routesPublic';
import { Crear_user } from './features/User/Crear_user';
import { Administrador } from './page/admin/Administrador';
import { MiLocal } from './page/local/MiLocal';
import { FormProductPost } from './features/FormularioProductos/FormProductPost';
import { ProductList } from './page/local/components/ProductList';
import { CarritoRender } from './page/carrito/components/CarritoRender';
import { CarritoProvider } from './context/CarritoContext/CarritoContext';
import { Pedidos_local } from './features/PedidosLocal/Pedidos_local';
import { CarritoLayout } from './page/carrito/CarritoLayout';
import { PedidoPorCiiente } from './features/HistorialPedido/PedidoPorCliente';

function App() {
  const { theme, toggleTheme } = useThemeMode()

  return (
    <>

      <div className=" grid grid-rows-[auto_1fr_auto] min-h-screen bg-background-light dark:bg-background-dark text-secondary dark:text-gray-100 transition-colors duration-300">
        <BrowserRouter>
          <ContextProvider>
            <CarritoProvider>

            <Navbar theme={theme} onToggle={toggleTheme} />
        <div>
            <Routes>
              <Route path="/" element={<Home />} />
                <Route path="/categoria/:nombre" element={<CategoFiltro />} />
                <Route path="/menu" element={<Menu />} />

              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/crear_user" element={<Crear_user />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path='/admin' element={<Administrador />} />

                <Route path='/carrito' element={<CarritoLayout/>} >
                <Route index element={<CarritoRender/>} />
                <Route path='pedidos' element={<PedidoPorCiiente />}/>
                </Route>
                

                <Route path='/local' element={<MiLocal />}>
                <Route index element={<ProductList/>} />
                <Route path='nuevoProducto' element={<FormProductPost/>} />
                <Route path='pedidos' element={<Pedidos_local/>} />
                </Route>
              </Route>

            </Routes>

          </div>
            </CarritoProvider>
          </ContextProvider>
                <Footer />
          
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

