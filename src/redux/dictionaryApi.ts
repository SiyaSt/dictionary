import axios from "axios";
import { Word } from "../types/types";

const API_KEY = "e174b1c6-1a9e-4f1e-a248-f5ef3e4c8ef4";
const API_URL = `https://dictionaryapi.com/api/v3/references/collegiate/json/`;

export const fetchDictionaryData = async (query: string): Promise<Word[]> => {
  try {
    const response = await axios.get(`${API_URL}${query}?key=${API_KEY}`);
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0 &&
      response.data[0].shortdef
    ) {
      let words: Word[] = response.data.slice(0, 10).map((entry) => ({
        word: entry.meta.id,
        type: entry.fl,
        definition: entry.shortdef[0],
      }));

      words.sort((a, b) => a.word.localeCompare(b.word));

      return words;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    throw error;
  }
};
