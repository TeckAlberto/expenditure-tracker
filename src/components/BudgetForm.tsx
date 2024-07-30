import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {

    const [ budget, setBudget ] = useState(0);

    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        setBudget(+e.target.value);
    }


    const isValid = useMemo( () => {
      return isNaN(budget) || budget <= 0;
    }, [budget]);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch({type: 'add-budget', payload: { budget }});
    }

    
    return (
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label
            htmlFor="budget"
            className="text-4xl font-bold text-center text-blue-600"
          >
            Definir Presupuesto
          </label>

          <input
            id="budget"
            type="number"
            className="w-full p-2 bg-white border border-gray-200"
            placeholder="Define tu presupuesto"
            name="budget"
            value={budget}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          value="definir Presupuesto"
          className="w-full p-2 font-bold text-white uppercase bg-blue-600 cursor-pointer hove:bg-blue-700 disabled:opacity-10"
          disabled={isValid}
        />
      </form>
    );
}
