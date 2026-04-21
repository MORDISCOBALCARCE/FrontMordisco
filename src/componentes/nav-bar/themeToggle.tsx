import type { Theme } from "../../types/types"

export interface Props{
    theme:Theme
    onToggle: () => void
}

export function ThemeToggle({theme,onToggle}:Props){
    const isDark = theme === 'dark'
    return(
        <button className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors" 
        onClick={onToggle}
        >
            <span >{isDark ? '☀️ Claro' : '🌙 Oscuro'}</span>
        </button>
    )
}
