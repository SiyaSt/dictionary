import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word } from "types/types";

interface StarWordsState {
  starWords: Word[];
}

const initialState: StarWordsState = {
  starWords: JSON.parse(localStorage.getItem("starWords") || "[]"),
};

const starWordsSlice = createSlice({
  name: "starWords",
  initialState,
  reducers: {
    setStarWords(state, action: PayloadAction<Word[]>) {
      state.starWords = action.payload;
      localStorage.setItem("starWords", JSON.stringify(action.payload));
    },
    toggleStarWord(state, action: PayloadAction<Word>) {
      const word = action.payload;
      const isStarred = state.starWords.some((starWord) => starWord.word === word.word);
      if (isStarred) {
        state.starWords = state.starWords.filter((starWord) => starWord.word !== word.word);
      } else {
        state.starWords.push(word);
      }
      localStorage.setItem("starWords", JSON.stringify(state.starWords));
    },
  },
});

export const { setStarWords, toggleStarWord } = starWordsSlice.actions;
export default starWordsSlice.reducer;
