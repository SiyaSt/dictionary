import { Checkbox } from "../CheckBox/CheckBox";
import { Options } from "../../types/types";
import { FC, useState } from "react";
import { ReactComponent as Square } from "../../imges/square.svg";

interface FilterProps {
  options: Options[];
  onChange: (selectedFilters: string[]) => void;
}

export const Filter: FC<FilterProps> = ({ options, onChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((filter) => filter !== value)
      : [...selectedFilters, value];
    setSelectedFilters(updatedFilters);
    onChange(updatedFilters);
  };

  return (
    <div className="filter">
      {options.map((option) => (
        <label key={option.value} className="filter-label">
          <Checkbox
            checked={selectedFilters.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            className="checkbox"
            icon={<Square className="icon" />}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};
