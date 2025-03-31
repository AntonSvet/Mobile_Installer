import "./floatingButton.css";  
interface MyComponentProps {
  openNewDevice: () => void;
}
const FloatingButton: React.FC<MyComponentProps> = ({ openNewDevice }) => {
  return (
    <button onClick={openNewDevice} className="floating-button">
      <span className="plus-icon"></span>
    </button>
  );
};

export default FloatingButton;
