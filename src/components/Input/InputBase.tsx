import { ChangeEvent, useEffect, useState } from "react";
import { setSearchQuery } from "../../redux/dictionarySlice";
import { fetchDictionaryEntries } from "../../redux/dictionaryThunk";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch } from "../../hooks/reduxHooks";

export const InputBase = () => {
  const [searchQueryState, setSearchQueryState] = useState("");
  const dispatch = useAppDispatch();
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
