import { type Categoria } from "../componentes/Categorias/Categorias.types";

export const categoriasMock: Categoria[] = [  
  {id: 1,
    nombre: "Al plato",
    icono: "restaurant",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    color: "text-primary",
  },
  {
    id: 2,
    nombre: "Bebidas",
    icono: "local_bar",
    bg: "bg-blue-50 dark:bg-blue-900/30",
    color: "text-blue-500",
  },
  {
    id: 3,
    nombre: "Postres",
    icono: "icecream",
    bg: "bg-pink-50 dark:bg-pink-900/30",
    color: "text-pink-500",
  },
  {
    id: 4,
    nombre: "pizza",
    icono: "local_pizza",
    bg: "bg-yellow-50 dark:bg-yellow-900/30",
    color: "text-yellow-600",
  }
];