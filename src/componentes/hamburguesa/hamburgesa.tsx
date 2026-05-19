import type { Producto } from "../promociones/promociones.types"
interface Props {
    prod:Producto
}
export default function Hamburgesa({prod}:Props){
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            {/* CONTENEDOR PRINCIPAL DEL CARRUSEL (Scroll horizontal suave) */}
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4">
                
                {/* TARJETA DE PRODUCTO 1 (Repite este bloque por cada producto) */}
                <div className="w-full flex-shrink-0 snap-center min-h-[500px] md:min-h-[450px] flex flex-col md:flex-row items-stretch overflow-hidden rounded-3xl bg-primary promo-gradient shadow-2xl shadow-primary/20">
                
                {/* 1. LADO DEL TEXTO (50% en escritorio, centrado verticalmente) */}
                <div className="relative z-10 w-full md:w-1/2 p-6 sm:p-10 md:p-16 flex flex-col justify-center">
                    <span className="inline-block self-start px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm mb-6 uppercase tracking-wider">
                    🔥 Promoción del Día
                    </span>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {prod.titulo} <br />
                    <span className="text-orange-200">al 50% de descuento</span>
                    </h1>
                    
                    <p className="text-white/90 text-base md:text-lg mb-8 max-w-md">
                    {prod.descripcion} ¡Solo por hoy!
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-primary px-6 py-3.5 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                        ¡Pedir ahora!
                    </button>
                    <button className="bg-transparent border-2 border-white/50 text-white px-6 py-3.5 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg hover:bg-white/10 transition-all">
                        Ver detalles
                    </button>
                    </div>
                </div>

                {/* 2. LADO DE LA IMAGEN (50% exacto en escritorio, visible en móvil) */}
                <div className="relative w-full h-64 md:h-auto md:w-1/2">
                    <img 
                    alt={prod.alt} 
                    className="h-full w-full object-cover object-center" 
                    src={prod.imagen}
                    />
                    {/* Degradado inteligente: se adapta según la posición de la imagen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent md:bg-gradient-to-r md:from-primary md:via-transparent md:to-transparent" />
                </div>

                </div>

                {/* TARJETA DE PRODUCTO 2 (Mismo tamaño garantizado) */}
                {/* <div className="w-full flex-shrink-0 snap-center ..."> ... </div> */}

            </div>
        </section>
    )
}