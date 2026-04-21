import { useState, useEffect } from "react";
import { productosMock } from "../../data/productos.data";
import styles from "./Promociones.module.css";
import Hamburgesa from "../hamburguesa/hamburgesa";

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="relative overflow-hidden rounded-3xl bg-primary promo-gradient min-h-[450px] flex items-center shadow-2xl shadow-primary/20">
        <div className={styles.carrusel}>
        <button className={styles.boton} onClick={anterior} >◀</button>
          <Hamburgesa prod={promoActual}/>
        <button className={styles.boton} onClick={siguiente} >▶</button>
        </div>
      </div>
    </section>
  );
};
