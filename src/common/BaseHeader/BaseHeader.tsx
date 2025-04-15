import { FaRegSave } from "react-icons/fa";
import "./baseHeader.css";
import BackArrow from "../BackArrow/BackArrow";

interface SensorCardProps {
  handleCloseModal: () => void;
  currentDeviceName: string;
  ref: React.RefObject<HTMLDivElement | null> | null;
}
const BaseHeader = ({ handleCloseModal, currentDeviceName, ref }: SensorCardProps) => {
  return (
    <header className="base-header-block" ref={ref}>
      <div className="base-header">
        <BackArrow handleCloseModal={handleCloseModal} />
        <div className="base-header-title">
          <span>{currentDeviceName}</span>
        </div>
        <div onClick={handleCloseModal} className="base-header-save">
          <FaRegSave className="base-header-icons" />
        </div>
      </div>
    </header>
  );
};

export default BaseHeader;
