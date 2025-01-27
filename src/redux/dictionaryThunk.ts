import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDictionaryData } from "./dictionaryApi";

export const fetchDictionaryEntries = createAsyncThunk(
  "dictionary/fetchEntries",
  async (query: string) => {
    return await fetchDictionaryData(query);
  },
);