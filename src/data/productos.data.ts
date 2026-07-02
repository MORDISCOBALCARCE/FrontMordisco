import { type Producto } from "../features/Promociones/promociones.types";

export const productosMock: Producto[] = [
    {
    id: 1,
    titulo: "Hamburguesa completa",
    descripcion: "Carne, lechuga, tomate, huevo y papas",
    precio: 5500,
    imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    alt: "Hamburguesa completa con papas",
    categoria: "promociones"
  },
  {
    id: 2,
    titulo: "Sandwich de milanesa",
    descripcion: "Pan francés con milanesa, lechuga y tomate",
    precio: 4000,
    imagen: "https://as1.ftcdn.net/v2/jpg/04/67/24/08/1000_F_467240815_dofrsNBpaquCDB334IE04tAyr5Cu8i2t.jpg",
    alt: "Sandwich de milanesa con vegetales",
    categoria: "promociones"
  }
]