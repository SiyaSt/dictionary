import { RootState } from "store/store";
import { createSelector } from "reselect";

const selectStarWordsState = (state: RootState) => state.starWords;

export const selectStarWords = createSelector(
  [selectStarWordsState],
  (starWordsState) => starWordsState.starWords
);