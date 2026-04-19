import { useState, useEffect } from "react";
import { productosMock } from "../../data/productos.data";
import styles from "./Promociones.module.css";

export default function Promociones() {
  const promociones = productosMock.filter(
    (p) => p.categoria === "promociones"
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (promociones.length === 0) return;

    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % promociones.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [promociones.length]);

  const siguiente = () => {
    setIndex((prev) => (prev + 1) % promociones.length);
  };

  const anterior = () => {
    setIndex((prev) =>
      prev === 0 ? promociones.length - 1 : prev - 1
    );
  };

  if (promociones.length === 0) {
    return <p>No hay promociones</p>;
  }

  const promoActual = promociones[index];

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}> Promociones</h2>

      <div className={styles.carrusel}>
        <button className={styles.boton} onClick={anterior}>◀</button>

        <div className={styles.banner}>
          <img
            src={promoActual.imagen}
            alt={promoActual.alt}
            className={styles.imagen}
          />

          <div className={styles.detalle}>
            <h3>{promoActual.titulo}</h3>
            <p>{promoActual.descripcion}</p>
            <p className={styles.precio}>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(promoActual.precio)}
            </p>
            <button
              className={styles.pedir}
              onClick={() => alert("Pedido agregado")}
            >
              Pedir ahora
            </button>
          </div>
        </div>

        <button className={styles.boton} onClick={siguiente}>▶</button>
      </div>
    </div>
  );
};

/*
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-primary promo-gradient min-h-[450px] flex items-center shadow-2xl shadow-primary/20">
                <div className="relative z-10 w-full lg:w-1/2 p-8 md:p-16">
                    <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm mb-6 uppercase tracking-wider">
                        🔥 Promoción del Día
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            La Mordisco Burger <br/><span className="text-orange-200">al 50% de descuento</span>
                    </h1>
                    <p className="text-white/90 text-lg mb-8 max-w-md">
                        Doble carne Angus, queso cheddar fundido, cebolla caramelizada y nuestra salsa secreta. ¡Solo por hoy!
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                            ¡Pedir ahora!
                        </button>
                        <button className="bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                            Ver detalles
                        </button>
                    </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 hidden lg:block">
                    <img alt="Hamburguesa Gourmet" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcXm5HVd6Q_KHDYAupAIbroiZ4Ke8XakpkJzeUyOluawa6rL4MvIBUD3AJ8ULQPgnblAXUq8OrSid0rjxOAiDroJwhrGwzLuQA78QNuleK-7HwtJJN-Z7B6FXMm4NDATzE6pb8oa6-QvdHpAEUNYll0u1RZjJFr-AzBfJYEtDNidJnyYl1D48gwza0i6D_E4WwV_as6yOETBOS8az8dCD1ArxbNw_Iu8Ibol5bMCTisJgjmuvUibeG7YfLv6XZL_HXZQd4S4tuDh3i"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent"></div>
                </div>
            </div>
        </section>
*/