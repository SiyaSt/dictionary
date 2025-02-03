import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDictionaryData } from "features/dictionaryApi";

export const fetchDictionaryEntries = createAsyncThunk(
  "dictionary/fetchEntries",
  async (query: string) => {
    return await fetchDictionaryData(query);
  },
);