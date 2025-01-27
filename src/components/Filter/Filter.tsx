import { FC } from "react";
import { ReactComponent as Square } from "imges/square.svg";
import { Checkbox } from "components";
import { Options } from "types/types";

interface FilterProps {
  options: Options[];
  onChange: (selectedFilters: string[]) => void;
  selectedFilters: string[];
}

export const Filter: FC<FilterProps> = ({
  options,
  onChange,
  selectedFilters,
}) => {
  const handleCheckboxChange = (value: string) => {
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((filter) => filter !== value)
      : [...selectedFilters, value];
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
