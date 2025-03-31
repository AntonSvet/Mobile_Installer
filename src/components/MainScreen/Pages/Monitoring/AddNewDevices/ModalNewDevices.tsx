import React from "react";
import "./modalNewDevice.css";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  openDevice: (el:string) => void;
  devices: string[];
}

const ModalNewDevices: React.FC<ModalProps> = ({ isOpen, onClose, devices, openDevice }) => {
  if (!isOpen) return null;
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div onClick={handleOverlayClick} className="modal-overlay">
      <div className="modal-content">
        <button className="close-button-new-device" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content-new-device">
          {devices.map((device, index) => (
            <button
              disabled={index > 2}
              onClick={() => openDevice(device)}
              className="device-list-new-device"
              key={index}
            >
              <span>{device}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalNewDevices;
