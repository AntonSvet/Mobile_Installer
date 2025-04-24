import React, { useState, useRef, useEffect } from "react";
import "./multiCheckbox.css"

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
}

const MultiCheckbox: React.FC<MultiCheckboxProps> = ({
    options,
    selectedValues,
    onChange,
    name,
    placeholder = "Разделы"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Генерация опций по умолчанию
    const defaultOptions: Option[] = Array.from({ length: 32 }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString()
    }));

    const itemsToRender = options || defaultOptions;

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
        const newValues = checked
            ? [...selectedValues, value]
            : selectedValues.filter(item => item !== value);

        onChange(newValues);
    };

    return (
        <div ref={wrapperRef} className="multi-options">
            <div className="multi-checkbox-block"
                onClick={toggleDropdown}

            >
                <div className="multi-checkbox-field" >
                    {selectedValues.length > 0
                        ? selectedValues.join(", ")
                        : placeholder}
                </div>

                {/* галка-вынести в отд. компонент */}
                <div style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    transition: "transform 0.3s ease",
                    transformOrigin: "center",
                    color: "black"
                }}>
                    <svg
                        style={{
                            transform: isOpen ? "rotate(180deg)" : "none",
                            transition: "transform 0.3s ease",

                        }}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0e0e0e"
                        strokeWidth="2"
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        maxHeight: "200px",
                        overflowY: "auto",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        marginTop: "4px",
                        zIndex: 1000,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                >
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                        gap: "8px",
                        padding: "8px"
                    }}>
                        {itemsToRender.map((option) => (
                            <label
                                key={option.value}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    cursor: "pointer",
                                    padding: "4px",
                                    userSelect: "none"
                                }}
                            >
                                <input
                                    type="checkbox"
                                    name={name}
                                    value={option.value}
                                    checked={selectedValues.includes(option.value)}
                                    onChange={handleCheckboxChange}
                                    style={{
                                        cursor: "pointer",
                                        width: "16px",
                                        height: "16px"
                                    }}
                                />
                                <span style={{ fontSize: "14px" }}>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiCheckbox;