import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  selectDictionaryError,
  selectDictionaryLoading,
  selectDictionaryResults,
} from "../../redux/dictionarySelectors";
import { InputBase, Loader, WordsList } from "../../components";
import { Aside } from "../../components";
import "./HomePage.scss";

export const HomePage = () => {
  const results = useSelector((state: RootState) =>
    selectDictionaryResults(state),
  );
  const loading = useSelector((state: RootState) =>
    selectDictionaryLoading(state),
  );
  const error = useSelector((state: RootState) => selectDictionaryError(state));

  const words = () => {
    if (results.length > 0) {
      return <WordsList results={results} />;
    }
    return <h3>Words not found!</h3>;
  };


  return (
    <div className="home-page">
      <Aside input={<InputBase />} filter={false} />
      {loading ? <Loader/> : words()}
      {error && <p>{error}</p>}
    </div>
  );
};
