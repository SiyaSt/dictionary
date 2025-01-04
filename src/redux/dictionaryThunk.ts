import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDictionaryData } from './dictionaryApi';
import { setResults, setLoading, setError } from './dictionarySlice';

export const fetchDictionaryEntries = createAsyncThunk(
  'dictionary/fetchEntries',
  async (query: string, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const results = await fetchDictionaryData(query);
      dispatch(setResults(results));
    } catch (error) {
      dispatch(setError('Error fetching data. Please try again later.'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);