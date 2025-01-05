import { FC, ReactNode, useState } from "react";
import "./CheckBox.scss";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  className: string;
  icon: ReactNode;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked: initialChecked,
  onChange,
  className,
  icon,
}) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    onChange();
  };

  return (
    <label className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="checkbox-input"
        readOnly
      />
      <span className={`checkbox-box ${checked ? "checked" : ""}`}>
        {icon}
      </span>
    </label>
  );
};
