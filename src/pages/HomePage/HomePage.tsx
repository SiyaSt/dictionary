import {
  selectDictionaryError,
  selectDictionaryLoading,
  selectDictionaryResults,
} from "../../redux/dictionarySelectors";
import { InputBase, Loader, WordsList } from "../../components";
import { Aside } from "../../components";
import "./HomePage.scss";
import { useAppSelector } from "../../hooks/reduxHooks";

export const HomePage = () => {
  const results = useAppSelector(selectDictionaryResults);
  const loading = useAppSelector(selectDictionaryLoading);
  const error = useAppSelector(selectDictionaryError);

  const words = () => {
    if (results.length > 0) {
      return <WordsList results={results} />;
    }
    return <h3>Words not found!</h3>;
  };

  return (
    <div className="home-page">
      <Aside input={<InputBase />} filter={false} />
      {loading ? <Loader /> : words()}
      {error && <p>{error}</p>}
    </div>
  );
};
