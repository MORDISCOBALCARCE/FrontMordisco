import { useState } from "react";

type SearchProps = {
  onSearch: (buscar: string) => void;
};

export function SearchProducts({onSearch}:SearchProps){
    const [buscar, setBuscar] = useState<string>('');

    const handleSearch = () => {
        onSearch(buscar);
        setBuscar('');
  };
    
    return (
        <div>
            <h3>Productos</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}>
                <input type="text"
                    placeholder="Buscar producto"
                    value={buscar} 
                    onChange={(e) => setBuscar(e.target.value)}/>
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}