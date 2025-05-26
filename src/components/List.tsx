import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../assets/todo_icon.png";
import { addPhrase, deletePhrase, setSearch } from "../store/phrasesSlice";
import type { RootState } from "../store/store";
import type { List } from "../types";
import ListItem from "./ListItem";

function AppList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { items, search } = useSelector((state: RootState) => state.phrases);

  const filteredItems = items.filter((item: List) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  const add = () => {
    const inputText = inputRef.current?.value.trim();
    if (!inputText) return;
    dispatch(addPhrase(inputText));
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className="bg-white place-self-center w-11/12 max-w-md
      flex flex-col p-7 min-h-[550px] rounded-xl"
    >
      {/* ------ title ------ */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={Icon} alt="Todo Icon" />
        <h1 className="text-3xl font-semibold">Lista de Frases</h1>
      </div>

      {/* ------ input box ------ */}
      <div className="flex items-center my-3 bg-gray-200 rounded-full">
        <input
          className="bg-transparent border-0 outline-none
    flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          ref={inputRef}
          type="text"
          placeholder="Añade una frase..."
        />
        <button
          className="border-none rounded-full bg-orange-600 
        w-32 h-14 text-white text-lg font-medium cursor-pointer"
          onClick={add}
        >
          Agregar +
        </button>
      </div>

      {/* Buscador */}
      <div className="flex items-center my-3 bg-gray-200 rounded-full">
        <input
          className="bg-transparent border-0 outline-none
    flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Buscar frases..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>

      {/* Lista filtrada */}
      <div className="grid gap-3">
        {filteredItems.map((item: List) => (
          <ListItem
            key={item.id}
            {...item}
            deleteItem={(id) => dispatch(deletePhrase(id))}
          />
        ))}
      </div>
    </div>
  );
}

export default AppList;
