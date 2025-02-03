import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word } from "shared/types/types";
import { fetchDictionaryEntries } from "features/dictionaryThunk";

interface DictionaryState {
  results: Word[];
  loading: boolean;
  error: string | null | undefined;
  starWords: Word[];
}

const initialState: DictionaryState = {
  results: [],
  loading: false,
  error: null,
  starWords: JSON.parse(localStorage.getItem("starWords") || "[]"),
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setStarWords(state, action: PayloadAction<Word[]>) {
      state.starWords = action.payload
      localStorage.setItem("starWords", JSON.stringify(action.payload));
    },
    toggleStarWord(state, action: PayloadAction<Word>) {
      const wordIndex = state.starWords.findIndex(
        (word) => word.word === action.payload.word
      );

      if (wordIndex !== -1) {
        state.starWords[wordIndex].checked = !state.starWords[wordIndex].checked;
        state.starWords.splice(wordIndex, 1);
      } else {
        state.starWords.push({ ...action.payload, checked: true });
      }
      localStorage.setItem("starWords", JSON.stringify(state.starWords.filter((word) => word.checked)));

      state.results = state.results.map(word => ({
        ...word,
        checked: state.starWords.some(starWord => starWord.word === word.word)
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDictionaryEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDictionaryEntries.fulfilled,
        (state, action: PayloadAction<Word[]>) => {
          state.loading = false;
          state.results = action.payload.map(word => ({
            ...word,
            checked: state.starWords.some(starWord => starWord.word === word.word)
          }));
        }
      )
      .addCase(fetchDictionaryEntries.rejected, (state) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export const { toggleStarWord, setStarWords } =
  dictionarySlice.actions;
export default dictionarySlice.reducer;