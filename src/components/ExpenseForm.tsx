import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {
    
    const [ expense, setExpense ] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    });

    const [ error, setError ] = useState('');
    const [ previousAmount, setPreviousAmount ] = useState(0);
    const { state, dispatch, remainingBudget } = useBudget();
    
    useEffect( () => {
      if(state.editingId) {
        const editingExpense = state.expenses.filter( expense => expense.id === state.editingId )[0];
        setExpense(editingExpense);
        setPreviousAmount(editingExpense.amount);
      }
    },[state.editingId])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar
        if(Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios');

            return;
        }

        // Validar que no me pase del limite
        if ( (expense.amount - previousAmount) > remainingBudget ) {
          setError("Ese gasto se sale del presupuesto");

          return;
        }

        //Agregar o actualizar el gasto
        if(state.editingId) {
          dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })

        } else {
          dispatch({ type: 'add-expense', payload: { expense } });

        }

        // Reiniciar el state
        setExpense({
          amount: 0,
          expenseName: "",
          category: "",
          date: new Date(),
        });

        setPreviousAmount(0);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        });
        
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    return (
      <form className="space-y-5" onSubmit={e => handleSubmit(e)}>
        <legend className="py-2 text-2xl font-black text-center uppercase border-b-4 border-blue-500">
          {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">
            Nombre Gasto:
          </label>

          <input
            type="text"
            id="expenseName"
            placeholder="Agrega el nombre del gasto"
            className="p-2 bg-slate-100"
            name="expenseName"
            value={expense.expenseName}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">
            Cantidad:
          </label>

          <input
            type="number"
            id="amount"
            placeholder="Agrega la cantidad del gasto: Ej. 300"
            className="p-2 bg-slate-100"
            name="amount"
            value={expense.amount}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-xl">
            Categoria:
          </label>

          <select
            id="category"
            className="p-2 bg-slate-100"
            name="category"
            value={expense.category}
            onChange={(e) => handleChange(e)}
          >
            <option value="">-- Seleccione una opcion --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">
            Fecha Gasto:
          </label>

          <DatePicker
            className="p-2 border-0 bg-slate-100"
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>

        <input
          type="submit"
          className="w-full p-2 font-bold text-white uppercase transition-all bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
          value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
        />
      </form>
    );
}
