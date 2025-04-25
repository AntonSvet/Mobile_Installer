import React, { useState, useRef, useEffect } from "react";
import "./multiCheckbox.css";
import SelectArrow from "./SelectArrow";
import { sortedSection } from "../../methods/methods";

type Option = {
  label: string;
  value: string;
};

interface MultiCheckboxProps {
  options?: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  name: string;
  placeholder?: string;
  maxHeight?: number;
  elementId: string;
}

const MultiCheckbox: React.FC<MultiCheckboxProps> = ({
  options,
  selectedValues,
  onChange,
  name,
  placeholder,
  maxHeight = "200",
  elementId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const defaultOptions: Option[] = Array.from({ length: 32 }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));

  const itemsToRender = options || defaultOptions;
  const viewportHeight = window.innerHeight;
  const triggerElement = document.querySelector(`#${elementId}`);
  const triggerRect = triggerElement?.getBoundingClientRect();
  const spaceBelow = triggerRect ? viewportHeight - triggerRect.bottom : 0;
  const dropdownHeight = Number(200);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newValues = checked ? [...selectedValues, value] : selectedValues.filter((item) => item !== value);
    onChange(newValues);
  };

  return (
    <div ref={wrapperRef} className="multi-options">
      <div className="multi-checkbox-block" id={elementId} onClick={toggleDropdown}>
        <div className="multi-checkbox-field">
          {selectedValues.length > 0 ? sortedSection(selectedValues) : placeholder}
        </div>
        {/* галка-вынести в отд. компонент */}
        <SelectArrow isOpen={isOpen} />
      </div>

      {isOpen && (
        <div
          className="multi-checkbox-grid-container"
          style={{
            bottom: `${spaceBelow >= dropdownHeight ? "" : "calc(100% + 8px)"}`,
            maxHeight: `${maxHeight}px`,
          }}
        >
          <div className="multi-checkbox-grid">
            {itemsToRender.map((option) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={handleCheckboxChange}
                />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiCheckbox;
