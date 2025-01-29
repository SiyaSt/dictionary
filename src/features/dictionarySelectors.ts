import { RootState } from "store/store";
import { createSelector } from "reselect";

const selectDictionary = (state: RootState) => state.dictionary;

export const selectDictionaryResults = createSelector(
  selectDictionary,
  (dictionary) => dictionary.results,
);

const selectStarWordsState = (state: RootState) => state.dictionary;

export const selectStarWords = createSelector(
  [selectStarWordsState],
  (starWordsState) => starWordsState.starWords
);

export const selectDictionaryLoading = (state: RootState) =>
  state.dictionary.loading;
export const selectDictionaryError = (state: RootState) =>
  state.dictionary.error;

export const selectDictionaryStatus = createSelector(
  [selectDictionaryLoading, selectDictionaryError],
  (loading, error) => ({
    loading: loading,
    error: error,
  }),
);
