import { ChangeEvent, FC, useEffect, useState } from "react";
import { setSearchQuery } from "features/dictionarySlice";
import { fetchDictionaryEntries } from "features/dictionaryThunk";
import { useDebounce } from "hooks/useDebounce";
import { useAppDispatch } from "hooks/reduxHooks";
import { useLocation } from "react-router-dom";


interface InputProps {
  value?: string;
  onChange: (value: string) => void;
  delay: number;
}

export const Input: FC<InputProps> = ({ value = "", onChange, delay }) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, delay);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/starWords") {
      onChange(debouncedValue);
    }
    else {
      if (debouncedValue) {
        dispatch(setSearchQuery(debouncedValue));
        dispatch(fetchDictionaryEntries(debouncedValue));
      }
    }
  }, [debouncedValue, onChange, dispatch, location.pathname]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};
