import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setSearchQuery } from "../../redux/dictionarySlice";
import { fetchDictionaryEntries } from "../../redux/dictionaryThunk";
import { useDebounce } from "../../utils/useDebounce";

export const InputBase = () => {
  const [searchQueryState, setSearchQueryState] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearchQuery = useDebounce(searchQueryState, 300);

  useEffect(() => {
    if (debouncedSearchQuery) {
      dispatch(setSearchQuery(debouncedSearchQuery));
      dispatch(fetchDictionaryEntries(debouncedSearchQuery));
    }
  }, [debouncedSearchQuery, dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQueryState(event.target.value);
  };

  return (
    <input type="text" value={searchQueryState} onChange={handleInputChange} />
  );
};
