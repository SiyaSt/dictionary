import {
  ChangeEvent,
  FC,
  KeyboardEvent as ReactKeyboardEvent,
  useState,
} from "react";
import "./Aside.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setSearchQuery } from "../../redux/dictionarySlice";
import { fetchDictionaryEntries } from "../../redux/dictionaryThunk";

export const Aside: FC = () => {
  const [searchQuery, setSearchQueryState] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    dispatch(setSearchQuery(searchQuery));
    dispatch(fetchDictionaryEntries(searchQuery));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQueryState(event.target.value);
  };
  return (
    <div className="aside">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
