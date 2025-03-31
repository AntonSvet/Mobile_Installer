import React, { useState } from "react";
import "./navigationButtons.css";  

const NavigationButtons: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>("Устройство");

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className="navigation-buttons">
      <button
        className={`nav-button ${selectedButton === "Устройство" ? "selected" : ""}`}
        onClick={() => handleButtonClick("Устройство")}
      >
        Все
      </button>
      <button
        className={`nav-button ${selectedButton === "Раздел" ? "selected" : ""}`}
        onClick={() => handleButtonClick("Раздел")}
      >
        Радиоканал
      </button>

      <button
        className={`nav-button ${selectedButton === "Состояние" ? "selected" : ""}`}
        onClick={() => handleButtonClick("Состояние")}
      >
        RS-485
      </button>
    </div>
  );
};

export default NavigationButtons;
