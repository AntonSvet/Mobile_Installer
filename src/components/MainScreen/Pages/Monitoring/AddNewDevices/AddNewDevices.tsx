import { useEffect, useRef, useState } from "react";
import "./addNewDevices.css";
import ModalNewDevices from "./ModalNewDevices";
import { devicesList } from "../../../../../const/const";
import { BrowserMultiFormatReader } from "@zxing/library";
import AddRadioDevice from "./AddRadioDevice/AddRadioDevice";
import useResizeObserver from "../../../../../hooks/useResizeObserver";
import BackArrow from "../../../../../common/BackArrow/BackArrow";

const AddNewDevice = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRadioDevice, setisModalRadioDevice] = useState(false);

  const [currentDevices, setCurrentDevices] = useState<string[]>([]);
  const [currentDevice, setCurrentDevice] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const codeReader = new BrowserMultiFormatReader();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useResizeObserver(headerRef);
  // Функция для открытия модального окна с определённым списком устройств
  const openModal = (deviceType: keyof typeof devicesList) => {
    setCurrentDevices(devicesList[deviceType]);
    setIsModalOpen(true);
  };

  function openDeviceCard() {
    setIsModalOpen(false);
    setisModalRadioDevice(false);
    handleCloseModal();
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openDevice = (typeDevice: string) => {
    setCurrentDevice(typeDevice);
    setisModalRadioDevice(true);
    closeModal();
  };
  const startScanning = async () => {
    setIsScanning(true);

    if (videoRef.current) {
      try {
        await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            setScannedData(result.getText());
            console.log("scannedData", scannedData);
            stopScanning();
            openDevice("МК Ю-5230");
          }
          if (err && !(err instanceof Error)) {
            console.error(err);
          }
        });
      } catch (error) {
        console.error("Error in QR code scanning:", error);
        alert(`Error in QR code scanning: ${error}`);
        stopScanning();
      }
    }
  };
  const stopScanning = () => {
    codeReader.reset();
    setIsScanning(false);
    videoRef.current = null;
  };
  useEffect(() => {
    return () => {
      if (codeReader) {
        codeReader.reset();
      }
    };
  }, [codeReader]);
  if (isModalRadioDevice) {
    return (
      <AddRadioDevice
        isOpen={isModalRadioDevice}
        onClose={() => setisModalRadioDevice(false)}
        deviceName={currentDevice}
        openDeviceCard={openDeviceCard}
      />
    );
  }

  return (
    <div className="new-device-card">
      <header ref={headerRef}>
        <div className="new-device-back-arrow">
          <BackArrow handleCloseModal={handleCloseModal} />
        </div>
        <div className="new-device-title">
          <span>Добавить:</span>
        </div>
      </header>
      <div className="new-device-content" style={{ marginTop: `${headerHeight + 30}px` }}>
        <div
          style={{
            display: isScanning ? "block" : "none",
          }}
          className="camera-container"
        >
          <video ref={videoRef} id="camera-preview"></video>

          <div className="scanning-overlay">
            <div className="scan-box">
              <div className="corner-bottom-left"></div>
              <div className="corner-bottom-right"></div>
            </div>
            <div className="scan-line"></div>
            <p className="scan-instruction">Наведите камеру на QR-код</p>
          </div>
        </div>

        <button onClick={isScanning ? stopScanning : startScanning} className="new-device-one">
          <div className="new-device-inside">
            <span>Сканировать QR-Код(Штрих-код)</span>
          </div>
        </button>
        <button onClick={() => openModal("radio")} className="new-device-one">
          <div className="new-device-inside">
            <span>Радио устройство</span>
          </div>
        </button>
        <button onClick={() => openModal("rs485")} className="new-device-one">
          <div className="new-device-inside">
            <span>RS-485 устройство</span>
          </div>
        </button>
      </div>
      {isModalOpen && (
        <ModalNewDevices isOpen={isModalOpen} onClose={closeModal} devices={currentDevices} openDevice={openDevice} />
      )}
    </div>
  );
};

export default AddNewDevice;
