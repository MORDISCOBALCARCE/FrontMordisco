import { useState } from "react";

type SearchProps = {
    onSearch: (buscar: string) => void;
};

export function SearchProducts({ onSearch }: SearchProps) {
    const [buscar, setBuscar] = useState<string>('');

    const handleSearch = () => {
        onSearch(buscar);
        setBuscar('');
    };

    return (
        <>
            <section className="max-w-4xl mx-auto px-4 mb-16">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg border border-orange-50 dark:border-gray-700 flex flex-col md:flex-row gap-2">
                    <form
                        className="flex-1 flex items-center px-4 gap-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}>
                        <span className="material-icons-round text-gray-400">search</span>
                        <input
                            name="search"
                            type="text"
                            className="w-full border-none focus:ring-0 bg-transparent text-secondary dark:text-gray-200 py-3"
                            placeholder="Buscar producto"
                            value={buscar}
                            onChange={(e) => setBuscar(e.target.value)} />
                        <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all">Buscar</button>
                    </form>
                </div>
            </section>
        </>)
}
