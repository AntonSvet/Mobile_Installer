import { useRef, useState } from "react";
import "./addNewDevices.css";
import ModalNewDevices from "./ModalNewDevices";
import { devicesList } from "../../../../../const/const";

import AddRadioDevice from "./AddRadioDevice/AddRadioDevice";

import BackArrow from "../../../../../common/BackArrow/BackArrow";
import Html5QrScanner from "../../../../../utils/QRScan/QRScan";
import { showErrorSnackbar, showSuccessSnackbar } from "../../../../../redux/reducers/snackbar/snackbarThunk";
import { useTypedDispatch } from "../../../../../hooks/useTypedDispatch";

const AddNewDevice = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const dispatch = useTypedDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRadioDevice, setisModalRadioDevice] = useState(false);
  const [currentDevices, setCurrentDevices] = useState<string[]>([]);
  const [currentDevice, setCurrentDevice] = useState<string>("");

  const [isScanning, setIsScanning] = useState<boolean>(false);

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

  const stopScanning = () => {
    setIsScanning(false);
  };

  function callback(data: string) {
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
    const currentType = typeDevice[key] || "";
    //alert(typeDevice[key]);
    if (currentType) {
      stopScanning();
      openDevice(currentType);
      dispatch(showSuccessSnackbar(`Код:${data}, уст:${currentType} `));
    } else {
      dispatch(showErrorSnackbar(`Код:${data} не корректный`));
    }
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
          {isScanning && <Html5QrScanner callback={callback} />}
        </div>

        {!isScanning && (
          <div style={{ marginTop: "50%" }}>
            <button onClick={() => setIsScanning((prev) => !prev)} className="new-device-one">
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
