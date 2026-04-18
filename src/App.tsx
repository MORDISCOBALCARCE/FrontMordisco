import{BrowserRouter,Routes, Route} from 'react-router-dom';
import Navbar from "./componentes/nav-bar/Navbar";
import Login from "./componentes/Login/Login";  
import Footer from "./componentes/Footer/Footer";
import Home from "./componentes/home/home";
import { useThemeMode } from './hooks/useThemeMode';

function App() {
    const {theme,toggleTheme} = useThemeMode()

  return (
    <>
    
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-secondary dark:text-gray-100 transition-colors duration-300">
      <BrowserRouter>
      <Navbar theme={theme} onToggle={toggleTheme} />

      <main className="conte-main pt-20 px-4">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
      </main>
          <Footer/>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
