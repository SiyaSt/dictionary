import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from "../types/types";

interface DictionaryState {
  searchQuery: string;
  results: Word[];
  loading: boolean;
  error: string | null;
}

const initialState: DictionaryState = {
  searchQuery: '',
  results: [],
  loading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setResults: (state, action: PayloadAction<Word[]>) => {
      state.results = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchQuery, setResults, setLoading, setError } = dictionarySlice.actions;
export default dictionarySlice.reducer;