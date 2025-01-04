import { RootState } from "../store/store";

export const selectDictionaryResults = (state: RootState) => state.dictionary.results;
export const selectDictionaryLoading = (state: RootState) => state.dictionary.loading;
export const selectDictionaryError = (state: RootState) => state.dictionary.error;