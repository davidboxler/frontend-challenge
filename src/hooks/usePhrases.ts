import { useDispatch, useSelector } from 'react-redux';
import { addPhrase, deletePhrase, setSearch } from '../store/phrasesSlice';
import type { RootState } from '../store/store';

export const usePhrases = () => {
  const dispatch = useDispatch();
  const { items, search } = useSelector((state: RootState) => state.phrases);

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  const add = (text: string) => dispatch(addPhrase(text));
  const remove = (id: number) => dispatch(deletePhrase(id));
  const updateSearch = (text: string) => dispatch(setSearch(text));

  return {
    items,
    filteredItems,
    search,
    add,
    remove,
    updateSearch,
  };
};
