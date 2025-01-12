import React, { FC, useEffect, useState } from "react";
import { useDebounce } from "../../utils/useDebounce";

interface DebounceInputProps {
  value: string;
  onChange: (value: string) => void;
  delay: number;
}

export const InputStar: FC<DebounceInputProps> = ({ value, onChange, delay }) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, delay);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};