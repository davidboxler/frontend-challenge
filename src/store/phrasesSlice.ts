import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { List } from '../types';

interface PhrasesState {
  items: List[];
  search: string;
}

const initialState: PhrasesState = {
  items: [],
  search: '',
};

const phrasesSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    addPhrase: (state, action: PayloadAction<string>) => {
      const newPhrase: List = {
        id: Date.now(),
        text: action.payload,
        isComplete: false,
      };
      state.items.push(newPhrase);
    },
    deletePhrase: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { addPhrase, deletePhrase, setSearch } = phrasesSlice.actions;
export default phrasesSlice.reducer;
