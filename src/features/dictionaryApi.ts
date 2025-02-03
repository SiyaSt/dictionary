import axios from "axios";
import { API_KEY, API_URL } from "shared/consts";
import { Word } from "shared/types/types";

export const fetchDictionaryData = async (query: string): Promise<Word[]> => {
  try {
    const response = await axios.get(`${API_URL}${query}?key=${API_KEY}`);
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0 &&
      response.data[0].shortdef
    ) {
      const words: Word[] = response.data.slice(0, 10).map((entry) => ({
        word: entry.meta.id,
        type: entry.fl,
        definition: entry.shortdef[0],
        checked: false,
        pronunciation: entry.hwi.hw,
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
