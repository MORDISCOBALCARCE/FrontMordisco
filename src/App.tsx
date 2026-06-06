import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from "./componentes/nav-bar/Navbar";
import Login from "./componentes/Login/Login";
import Footer from "./componentes/Footer/Footer";
import Home from "./page/home/home";
import { useThemeMode } from './hooks/useThemeMode';
import Menu from './page/menu/menu';
import { CategoNombre } from './componentes/Categorias/CategoNombre/CategoNombre';
import { ContextProvider } from './context/AuthContex';
import { ProtectedRoute } from './componentes/auth/protectedRoute';
import { PublicRoute } from './componentes/auth/routesPublic';
import { MiCuenta } from './page/MiCuenta/MiCuenta';
import { Crear_user } from './componentes/user/Crear_user';
import { Administrador } from './page/admin/Administrador';

function App() {
  const { theme, toggleTheme } = useThemeMode()

  return (
    <>

      <div className="min-h-screen bg-background-light dark:bg-background-dark text-secondary dark:text-gray-100 transition-colors duration-300">
        <BrowserRouter>
          <ContextProvider>
            <Navbar theme={theme} onToggle={toggleTheme} />

            <Routes>
              <Route path="/" element={<Home />} />

              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/crear_user" element={<Crear_user />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/menu" element={<Menu />} />
                <Route path='/micuenta' element={<MiCuenta />} />
                <Route path='/admin' element={<Administrador />} />
                <Route path="/categoria/:nombre" element={<CategoNombre />} />
              </Route>

            </Routes>

          </ContextProvider>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

