import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../assets/todo_icon.png";
import { useDebounce } from "../hooks/useDebounce";
import { usePhrases } from "../hooks/usePhrases";
import type { List } from "../types";
import { enhanceText } from "../utils/enhanceText";
import ListItem from "./ListItem";

function AppList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { filteredItems, search, add, remove, updateSearch } = usePhrases();

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    updateSearch(debouncedSearch);
  }, [debouncedSearch, updateSearch]);

  const handleAdd = () => {
    const rawText = inputRef.current?.value ?? "";
    const enhanced = enhanceText(rawText.trim());

    if (!enhanced) {
      alert("La frase no puede estar vacía.");
      return;
    }

    const alreadyExists = filteredItems.some(
      (item) => item.text.toLowerCase() === enhanced.toLowerCase()
    );
    if (alreadyExists) {
      alert("Esa frase ya existe.");
      return;
    }

    add(enhanced);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDelete = useCallback(
    (id: number) => {
      remove(id);
    },
    [remove]
  );

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
          onClick={handleAdd}
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
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Lista filtrada */}
      <div className="grid gap-3">
        {filteredItems.map((item: List) => (
          <ListItem key={item.id} {...item} deleteItem={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default AppList;
