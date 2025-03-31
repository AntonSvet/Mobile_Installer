import "./settingRSCard.css";
import { devicesActions } from "../../../../../../redux/reducers/devices/devicesReducer";
import { useTypedDispatch } from "../../../../../../hooks/useTypedDispatch";
import icon1 from "../../../../../../img/icon/image 52.png";
import icon2 from "../../../../../../img/icon/image 53.png";
import icon5 from "../../../../../../img/icon/image 51.png";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import { IRadioDevices } from "../../../../../../redux/reducers/devices/devices.types";

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
          <div onClick={handleCloseModal} className="setting-rs-back-arrow">
            {"<"}
          </div>

          <div className="setting-rs-card-header-position">
            <span style={{ fontSize: "clamp(25px, 4vw, 24px)", color: "var(--header-text-color" }}>
              {currentDevice.fullName}
            </span>
          </div>

          <div style={{ paddingRight: "5px" }}>
            <SaveTwoToneIcon fontSize="large" />
          </div>
        </div>
        <div className="setting-rs-card-middle-header">
          <div style={{ width: "50%" }}>
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
            <img src={icon5} alt="logo2084" />
            <span>Корпус - </span>
            <span>Закрыт </span>
          </div>
          <div>
            <img src={icon1} alt="logo2084" />
            <span>Питание -</span>
            <span>Норма </span>
          </div>

          <div>
            <img src={icon2} alt="logo2084" />
            <span>RS485 - </span>
            <span>Подключено </span>
          </div>
        </div>
      </header>
      <div className="setting-rs-card-content">
        {currentDevice.zone.map((zoneId, i) => {
          if (zoneId === null) return null;
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
                    <input style={{ width: "160px", borderRadius: "6px" }} placeholder="Псевдоним" />
                  </div>
                </div>
                <div className="setting-rs-card-block">
                  <span style={{ marginRight: "8px" }}>Тип</span>
                  <select style={{ fontSize: "17px" }} name="" id="">
                    <option style={{ fontSize: "17px" }}>Охранная с зад.(Проходная) с контр. взлома</option>
                    <option style={{ fontSize: "17px" }} value="Охранная">
                      Охранная
                    </option>
                  </select>
                </div>
                <div className="setting-rs-card-block">
                  <div className="setting-rs-card-block-row">
                    <span>Задержка вход</span>
                    <input width="30px" />
                  </div>
                  <div className="setting-rs-card-block-row">
                    <span>Выход</span>
                    <input width="30px" />
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
