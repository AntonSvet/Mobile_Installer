 import { useState } from "react";
import ImageLoader from "../../../../../../common/ImageLoader/ImageLoader";
import "./addRadioDevice.css";
import { useTypedDispatch } from "../../../../../../hooks/useTypedDispatch";
import { devicesActions } from "../../../../../../redux/reducers/devices/devicesReducer";
import { radioDevice } from "../../../../../../utils/mock";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  openDeviceCard: (el: string) => void;
  deviceName: string;
}

const AddRadioDevice: React.FC<ModalProps> = ({ isOpen, onClose, deviceName, openDeviceCard }) => {
  const [isNewDevice, setIsNewDevice] = useState<boolean>(false);
  const dispatch = useTypedDispatch();
  function openNewDevice() {
    setIsNewDevice(true);
    setTimeout(() => {
      setIsNewDevice(false);
      openDeviceCard(deviceName);
      const randomId = Math.floor(Math.random() * 100);
      const selectedDevice = radioDevice.find((el) => el.name === deviceName) || radioDevice[0];
      const deviceWithRandomId = {
        ...selectedDevice,
        id: randomId,
        number: randomId,
      };
      if (!deviceName.includes("РШ")) {
        dispatch(devicesActions.addRadioDevice(deviceWithRandomId));
      } else {
        dispatch(devicesActions.addRSDevice(deviceWithRandomId));
      }
    }, 2000);
  }
  if (!isOpen) return null;
  return (
    <div className="new-radio-card">
      <header>
        <div onClick={onClose} className="new-radio-back-arrow">
          {"<"}
        </div>
        <div className="new-radio-font-size">
          <span>{deviceName}</span>
        </div>

        {!deviceName.includes("РШ") ? (
          <div className="new-radio-instruction">
            <span>1.Для батареи "ER14250" должна быть проведена предварительная депассивация</span>
            <span>2.Установите элемент питания в датчик </span>
            <span>3.При зажатой кнопке mode переведите выключатель в положение on. </span>
            <span>4.Датчик перейдет в режим обучения далее нажать кнопку “Продолжить”. </span>
          </div>
        ) : (
          <div className="new-radio-instruction">
            <span>
              Переведите расширитель в режим конфигурирования, для этого замкните перемычку J1 и нажмите кнопку
              “Продолжить”
            </span>
          </div>
        )}
      </header>
      <div className="new-radio-content">
        <button onClick={openNewDevice} className="new-radio-one">
          <div className="new-radio-inside">
            <span>Продолжить</span>
          </div>
        </button>
      </div>
      {isNewDevice && <ImageLoader progress={42} title={"Поиск устройства"} />}
    </div>
  );
};

export default AddRadioDevice;
