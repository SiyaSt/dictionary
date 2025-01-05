import React, { FC, useEffect } from "react";
import { useDebounce } from "../../utils/useDebounce";

interface DebounceInputProps {
  value: string;
  onChange: (value: string) => void;
  delay: number;
}

export const InputStar: FC<DebounceInputProps> = ({ value, onChange, delay }) => {
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
