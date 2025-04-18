import { useEffect, useRef, useState } from "react";
import "./addNewDevices.css";
import ModalNewDevices from "./ModalNewDevices";
import { devicesList } from "../../../../../const/const";
import { BrowserMultiFormatReader } from "@zxing/library";
import AddRadioDevice from "./AddRadioDevice/AddRadioDevice";

import BackArrow from "../../../../../common/BackArrow/BackArrow";
import Html5QrScanner from "../../../../../utils/QRScan/QRScan";

const AddNewDevice = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRadioDevice, setisModalRadioDevice] = useState(false);

  const [currentDevices, setCurrentDevices] = useState<string[]>([]);
  const [currentDevice, setCurrentDevice] = useState<string>("");

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const codeReader = new BrowserMultiFormatReader();
  const headerRef = useRef<HTMLDivElement>(null);

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
    /*
    if (videoRef.current) {
      try {
        await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            setScannedData(result.getText());
            console.log("scannedData", scannedData);
            stopScanning();
            openDevice("ИК Ю-5230");
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
    } */
  };
  const stopScanning = () => {
    setIsScanning(false);
    /*  codeReader.reset();
    videoRef.current = null; */
  };
  useEffect(() => {
    return () => {
      if (codeReader) {
        codeReader.reset();
      }
    };
  }, [codeReader]);

  function callback(data: string) {
    stopScanning();
    const typeDevice = {
      "5130": "МК Ю-5130",
      "5830": "АК Ю-5830",
      "5230": "ИК Ю-5230",
      "5231": "ИК Ю-5231",
      "6270": "ИК Ю-6270",
    };
    //alert(data);
    const key = data.slice(-5, -1) as keyof typeof typeDevice;
    //alert(key);
    const currentType = typeDevice[key] || "ИК Ю-5230";
    //alert(typeDevice[key]);
    openDevice(currentType);
  }

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
      {!isScanning && (
        <header ref={headerRef}>
          <div className="new-device-back-arrow">
            <BackArrow handleCloseModal={handleCloseModal} />
          </div>
          <div className="new-device-title">
            <span>Добавить:</span>
          </div>
        </header>
      )}
      <div className="new-device-content">
        <div
          style={{
            display: isScanning ? "block" : "none",
          }}
          className="camera-container"
        >
          {/* <video ref={videoRef} id="camera-preview"></video> */}
          {isScanning && <Html5QrScanner callback={callback} />}
          {/*  <div className="scanning-overlay">
            <div className="scan-box">
              <div className="corner-bottom-left"></div>
              <div className="corner-bottom-right"></div>
            </div>
            <div className="scan-line"></div>
            <p className="scan-instruction">Наведите камеру на QR-код</p>
          </div> */}
        </div>

        {!isScanning && (
          <div style={{ marginTop: "50%" }}>
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
        )}
        {isScanning && (
          <button style={{ right: "33%" }} onClick={stopScanning} className="qr-scan-button">
            <div className="qr-icon">&#x1F4F7;</div>
            <div className="qr-text"> Отмена </div>
          </button>
        )}
      </div>
      {isModalOpen && (
        <ModalNewDevices isOpen={isModalOpen} onClose={closeModal} devices={currentDevices} openDevice={openDevice} />
      )}
    </div>
  );
};

export default AddNewDevice;
