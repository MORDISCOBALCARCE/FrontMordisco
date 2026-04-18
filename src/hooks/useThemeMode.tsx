import { useEffect,useState } from "react";
import { type Theme } from '../types/types'

function getSystemTheme(){
    return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'
}

export function useThemeMode(){
    const [theme, setTheme] = useState<Theme>(getSystemTheme())

    useEffect(()=>{
        if (theme === 'dark'){
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')

        }else 
            document.documentElement.classList.remove('dark')

    },[theme]);

    const toggleTheme = () => {
        setTheme((prev)=>prev==='light' ? 'dark' : 'light')
    }

    return {theme,toggleTheme}
}

