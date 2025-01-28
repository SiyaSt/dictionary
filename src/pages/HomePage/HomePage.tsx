import {
  selectDictionaryResults,
  selectDictionaryStatus,
} from "features/dictionarySelectors";
import { Loader, WordsList } from "components";
import { Aside } from "components";
import { setSearchQuery } from "features/dictionarySlice";
import { fetchDictionaryEntries } from "features/dictionaryThunk";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { useDebounce } from "hooks/useDebounce";
import { useEffect, useState } from "react";
import { delay } from "shared/consts";
import "./HomePage.scss";

export const HomePage = () => {
  const results = useAppSelector(selectDictionaryResults);
  const { loading, error } = useAppSelector(selectDictionaryStatus);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedValue = useDebounce(searchTerm, delay);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debouncedValue) {
      dispatch(setSearchQuery(debouncedValue));
      dispatch(fetchDictionaryEntries(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  const words = () => {
    if (results.length > 0) {
      return <WordsList words={results} isStarWordPage={false} />;
    }
    return <h3>Words not found!</h3>;
  };

  return (
    <div className="home-page">
      <Aside
        filter={false}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {loading ? <Loader /> : words()}
      {error && <p>{error}</p>}
    </div>
  );
};
