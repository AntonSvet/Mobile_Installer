import React, { useState } from "react";
import "./customSlider.css";

interface SliderProps {
  defaultValue?: number;
  max?: number;
  min?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const CustomSlider: React.FC<SliderProps> = ({ defaultValue = 3, max = 10, min = 0, step = 1, onChange }) => {
  const [value, setValue] = useState<number>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="custom-slider-container">
      <input type="range" min={min} max={max} step={step} value={value} onChange={handleChange} />
      <div className="slider-value">{value}</div>
    </div>
  );
};

export default CustomSlider;
