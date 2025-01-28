import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word } from "shared/types/types";
import { fetchDictionaryEntries } from "features/dictionaryThunk";

interface DictionaryState {
  searchQuery: string;
  results: Word[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: DictionaryState = {
  searchQuery: "",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDictionaryEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDictionaryEntries.fulfilled, (state, action: PayloadAction<Word[]>) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchDictionaryEntries.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const { setSearchQuery } = dictionarySlice.actions;
export default dictionarySlice.reducer;
