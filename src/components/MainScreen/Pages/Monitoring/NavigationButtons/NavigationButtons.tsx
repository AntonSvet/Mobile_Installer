import "./navigationButtons.css";

interface Props {
  selectedButton: string;
  handleButtonClick: (button: string) => void;
}

const NavigationButtons: React.FC<Props> = ({ selectedButton, handleButtonClick }) => {
  return (
    <div className="navigation-buttons">
      <button
        className={`nav-button ${selectedButton === "Все" ? "selected" : ""}`}
        onClick={() => handleButtonClick("Все")}
      >
        Все
      </button>
      <button
        className={`nav-button ${selectedButton === "Радиоканал" ? "selected" : ""}`}
        onClick={() => handleButtonClick("Радиоканал")}
      >
        Радиоканал
      </button>

      <button
        className={`nav-button ${selectedButton === "RS-485" ? "selected" : ""}`}
        onClick={() => handleButtonClick("RS-485")}
      >
        RS-485
      </button>
    </div>
  );
};

export default NavigationButtons;
