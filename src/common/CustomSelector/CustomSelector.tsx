import React from "react";
import "./сustomSelector.css";
interface SelectOption {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  width?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, width }) => {
  return (
    <select className="template-card-select" style={{ width: width }}>
      <div className="template-card-block-select-options">
        {options.map((option) => (
          <option className="template-card-block-select-options" key={option.value}>
            {option.label}
          </option>
        ))}
      </div>
    </select>
  );
};

export default CustomSelect;
