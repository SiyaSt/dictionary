import { ChangeEvent, FC } from "react";

interface InputProps {
  value?: string;
  setInputValue: (value: string) => void;
}

export const Input: FC<InputProps> = ({ value = "", setInputValue }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return <input type="text" value={value} onChange={handleInputChange} />;
};
