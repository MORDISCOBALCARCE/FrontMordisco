import { type Categoria } from "./Categorias.types";

type CategoriasProps = {
  categorias: Categoria[];
  onSelectCategoria?: (categoria: Categoria) => void;
};

export const Categorias = ({ categorias, onSelectCategoria }: CategoriasProps) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-secondary dark:text-white">
          Categorías
        </h2>

        <a className="text-primary font-semibold flex items-center gap-1 hover:underline" href="#">
          Ver todas
          <span className="material-icons-round text-sm">arrow_forward</span>
        </a>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {categorias.map((cat) => (
          <div
            key={cat.id}
            className="group cursor-pointer"
            onClick={() => onSelectCategoria?.(cat)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-orange-200 border border-transparent hover:border-primary">

              <div className={`w-16 h-16 ${cat.bg || "bg-gray-100"} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                
                <span className={`material-icons-round ${cat.color || "text-primary"} text-4xl`}>
                  {cat.icono}
                </span>

              </div>

              <span className="font-bold text-lg">
                {cat.nombre}
              </span>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};