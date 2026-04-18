import { useState, useEffect } from "react";
import { productosMock } from "./promociones.data";
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