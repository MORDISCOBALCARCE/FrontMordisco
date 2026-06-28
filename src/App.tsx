import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from "./componentes/nav-bar/Navbar";
import Login from "./features/Login/Login";
import Footer from "./componentes/Footer/Footer";
import Home from "./page/home/home";
import { useThemeMode } from './hooks/useThemeMode';
import Menu from './page/menu/menu';
import { CategoFiltro } from './componentes/Categorias/CategoriaFiltro/CategoFiltro';
import { ContextProvider } from './context/AuthContex';
import { ProtectedRoute } from './features/auth/protectedRoute';
import { PublicRoute } from './features/auth/routesPublic';
import { Crear_user } from './features/user/Crear_user';
import { Administrador } from './page/admin/Administrador';
import { MiLocal } from './page/local/MiLocal';
import { FormProductPost } from './componentes/formularioProductos/FormProductPost';
import { ProductList } from './page/local/ProductList';
import { Carrito } from './page/carrito/Carrito';
import { CarritoProvider } from './context/caritoContext/CarritoContext';

function App() {
  const { theme, toggleTheme } = useThemeMode()

  return (
    <>

      <div className="min-h-screen bg-background-light dark:bg-background-dark text-secondary dark:text-gray-100 transition-colors duration-300">
        <BrowserRouter>
          <ContextProvider>
            <CarritoProvider>

            <Navbar theme={theme} onToggle={toggleTheme} />

            <Routes>
              <Route path="/" element={<Home />} />
                <Route path="/categoria/:nombre" element={<CategoFiltro />} />

              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/crear_user" element={<Crear_user />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/menu" element={<Menu />} />
                <Route path='/admin' element={<Administrador />} />
                <Route path='/carrito' element={<Carrito/>} />

                <Route path='/local' element={<MiLocal />}>
                <Route index element={<ProductList/>} />
                <Route path='nuevoProducto' element={<FormProductPost/>} />
                </Route>
              </Route>

            </Routes>

            </CarritoProvider>
          </ContextProvider>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

