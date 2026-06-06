import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from "./componentes/nav-bar/Navbar";
import Login from "./componentes/Login/Login";
import Footer from "./componentes/Footer/Footer";
import Home from "./componentes/home/home";
import { useThemeMode } from './hooks/useThemeMode';
import Menu from './componentes/menu/menu';
import { CategoNombre } from './componentes/Categorias/CategoNombre/CategoNombre';
import { ContextProvider } from './componentes/auth/context/AuthContex';
import { ProtectedRoute } from './componentes/auth/protectedRoute';
import { PublicRoute } from './componentes/auth/routesPublic';
import { MiCuenta } from './componentes/MiCuenta/MiCuenta';

function App() {
  const { theme, toggleTheme } = useThemeMode()

  return (
    <>

      <div className="min-h-screen bg-background-light dark:bg-background-dark text-secondary dark:text-gray-100 transition-colors duration-300">
        <BrowserRouter>
          <ContextProvider>
            <Navbar theme={theme} onToggle={toggleTheme} />

            <main className="conte-main pt-20 px-4">
              <Routes>
                <Route path="/" element={<Home />} />

                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/menu" element={<Menu />} />
                  <Route path='/micuenta' element={<MiCuenta />} />
                  <Route path="/categoria/:nombre" element={<CategoNombre />} />
                </Route>

              </Routes>
            </main>
          </ContextProvider>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

