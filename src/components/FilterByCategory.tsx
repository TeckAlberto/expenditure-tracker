import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-category', payload: { id: e.target.value } });
    }

    return (
        <div className="p-10 bg-white rounded-lg shadow-lg">
        <form action="">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <label htmlFor="category">Filtrar Gastos</label>
                <select
                    className="flex-1 p-3 rounded bg-slate-100"
                    id="category"
                    onChange={handleChange}
                >
                    <option value="">Todas las categorias</option>
                    {categories.map( category => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
        </div>
    );
}
