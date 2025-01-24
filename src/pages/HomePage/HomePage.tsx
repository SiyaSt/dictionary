import {
  selectDictionaryResults,
  selectDictionaryStatus,
} from "../../redux/dictionarySelectors";
import { Input, Loader, WordsList } from "../../components";
import { Aside } from "../../components";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useState } from "react";
import "./HomePage.scss";

export const HomePage = () => {
  const results = useAppSelector(selectDictionaryResults);
  const { loading, error } = useAppSelector(selectDictionaryStatus);
  const [, setSearchTerm] = useState("");

  const words = () => {
    if (results.length > 0) {
      return <WordsList words={results} isStarWordPage={false}/>;
    }
    return <h3>Words not found!</h3>;
  };

  const delay = 300;
  return (
    <div className="home-page">
      <Aside input={<Input delay={delay} onChange={setSearchTerm} />} filter={false} />
      {loading ? <Loader /> : words()}
      {error && <p>{error}</p>}
    </div>
  );
};
