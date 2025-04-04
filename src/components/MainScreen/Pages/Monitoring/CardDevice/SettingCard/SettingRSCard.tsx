import "./settingRSCard.css";
import { devicesActions } from "../../../../../../redux/reducers/devices/devicesReducer";
import { useTypedDispatch } from "../../../../../../hooks/useTypedDispatch";
import { IRadioDevices } from "../../../../../../redux/reducers/devices/devices.types";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { TbDeviceIpadCode } from "react-icons/tb";
import { LiaCarBatterySolid } from "react-icons/lia";
import IconRS485 from "./IconRS485";

interface SettingRSCardProps {
  handleCloseModal: () => void;
  currentDevice: IRadioDevices;
}

const SettingRSCard = ({ handleCloseModal, currentDevice }: SettingRSCardProps) => {
  const dispatch = useTypedDispatch();
  function deleteDevice() {
    dispatch(devicesActions.removeRSDevice(currentDevice.id));
    handleCloseModal();
  }
  return (
    <div className="setting-rs-card">
      <header>
        <div className="setting-rs-card-top-header">
          <div onClick={handleCloseModal} className="setting-rs-card-back-arrow">
            <IoIosArrowBack className="setting-rs-card-top-header-icons" />
          </div>

          <div className="setting-rs-header-position">
            <span>{currentDevice.fullName}</span>
          </div>

          <div className="setting-rs-card-save">
            <FaRegSave className="setting-rs-card-top-header-icons" />
          </div>
        </div>
        <div className="setting-rs-card-middle-header">
          <div style={{ width: "50%", marginLeft: "8px" }}>
            <img width="60%;" src={currentDevice.image} alt="logo2084" />
          </div>
          <div className="setting-rs-card-info">
            <div>
              <span>
                {currentDevice.name} № {currentDevice.number}
              </span>
            </div>
            <div>
              <span>Версия ПО - 1.0а</span>
            </div>
          </div>
        </div>

        <div className="setting-rs-card-bottom-header">
          <div>
            <TbDeviceIpadCode className="icons" />
            <span>Корпус - </span>
            <span>Закрыт </span>
          </div>
          <div>
            <LiaCarBatterySolid className="icons" />
            <span>Питание -</span>
            <span>Норма </span>
          </div>

          <div>
            <IconRS485 />
            <span>RS485 - </span>
            <span>Подключено </span>
          </div>
        </div>
      </header>
      <div className="setting-rs-card-content">
        {currentDevice.zone.map((_item: number | null, i: number) => {
          return (
            <div key={i} className="setting-rs-card-one">
              <div className="setting-rs-card-inside">
                <div className="setting-rs-card-block">
                  <div className="setting-rs-card-block-row">
                    <span>Зона</span>
                    <input />
                  </div>
                  <div className="setting-rs-card-block-row">
                    <span>Разд.</span>
                    <input />
                  </div>
                  <div>
                    <input className="setting-rs-card-block-custom-input" placeholder="Псевдоним" />
                  </div>
                </div>
                <div className="setting-rs-card-block">
                  <span style={{ marginRight: "8px" }}>Тип</span>
                  <select name="" id="">
                    <option>Охранная с зад.(Проходная) с контр. взлома</option>
                    <option value="Охранная">Охранная</option>
                  </select>
                </div>
                <div className="setting-rs-card-block">
                  <div className="setting-rs-card-block-row">
                    <span>Задержка вход</span>
                    <input />
                  </div>
                  <div className="setting-rs-card-block-row">
                    <span>Задержка выход</span>
                    <input />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <button className="setting-rs-card-delete">
          <span onClick={deleteDevice}>Удалить устройство</span>
        </button>
      </div>
    </div>
  );
};

export default SettingRSCard;
