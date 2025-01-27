import { configureStore } from '@reduxjs/toolkit';
import dictionaryReducer from "features/dictionarySlice";
import starWordsReducer from "features/starWordsSlice";

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
    starWords: starWordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;