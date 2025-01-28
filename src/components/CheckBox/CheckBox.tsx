import { FC, ReactNode, useState } from "react";
import { classNames } from "shared/utils/ClassName";
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
    setChecked((prev) => !prev);
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
      <span className={classNames("checkbox-box", { checked: checked })}>
        {icon}
      </span>
    </label>
  );
};
