import { type Producto } from "../promociones/promociones.types"

interface Props {
    producto:Producto
}

export function Card({producto}:Props){
return(
    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary/20 flex flex-col h-full">
        <div className="h-48 overflow-hidden relative">
            <img alt="Hamburguesa Mordisco" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={producto.imagen}/>
            <div className="absolute top-4 right-4 bg-primary text-white font-bold px-3 py-1 rounded-full shadow-lg">${producto.precio}</div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 dark:text-white">{producto.titulo}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{producto.descripcion}</p>
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-orange-500">
                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                    <span className="text-sm font-bold">{Math.floor(Math.random()*5)}</span>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white p-2 rounded-xl transition-all shadow-md active:scale-95">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>
        </div>    
    </div>
    )
}