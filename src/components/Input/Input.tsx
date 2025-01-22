import { ChangeEvent, FC, useEffect, useState } from "react";
import { setSearchQuery } from "../../redux/dictionarySlice";
import { fetchDictionaryEntries } from "../../redux/dictionaryThunk";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch } from "../../hooks/reduxHooks";

interface InputProps {
  value?: string;
  onChange: (value: string) => void;
  delay: number;
}

export const Input: FC<InputProps> = ({ value = "", onChange, delay }) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, delay);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onChange(debouncedValue);
    if (debouncedValue) {
      dispatch(setSearchQuery(debouncedValue));
      dispatch(fetchDictionaryEntries(debouncedValue));
    }
  }, [debouncedValue, onChange, dispatch]);

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
