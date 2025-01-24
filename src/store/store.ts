import { configureStore } from '@reduxjs/toolkit';
import dictionaryReducer from "../redux/dictionarySlice";
import starWordsReducer from "../redux/starWordsSlice";

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
    starWords: starWordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;