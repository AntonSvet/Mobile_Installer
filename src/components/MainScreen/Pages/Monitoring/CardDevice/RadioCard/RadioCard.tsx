import "./radioCard.css";
import { devicesActions } from "../../../../../../redux/reducers/devices/devicesReducer";
import { useTypedDispatch } from "../../../../../../hooks/useTypedDispatch";
import { GiBattery50 } from "react-icons/gi";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { FaSignal } from "react-icons/fa";
import { RiRouterLine } from "react-icons/ri";
import { TbDeviceIpadCode } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IRadioDevices } from "../../../../../../redux/reducers/devices/devices.types";

interface RadioCardProps {
  handleCloseModal: () => void;
  currentDevice: IRadioDevices;
}

const RadioCard = ({ handleCloseModal, currentDevice }: RadioCardProps) => {
  const dispatch = useTypedDispatch();
  function deleteDevice() {
    dispatch(devicesActions.removeRadioDevice(currentDevice.id));
    handleCloseModal();
  }
  return (
    <div className="radio-card">
      <header>
        <div className="radio-card-top-header">
          <div onClick={handleCloseModal} className="radio-card-back-arrow">
            <IoIosArrowBack className="radio-card-top-header-icons" />
          </div>

          <div className="radio-header-position">
            <span>{currentDevice.fullName}</span>
          </div>

          <div className="radio-card-save">
            <FaRegSave className="radio-card-top-header-icons" />
          </div>
        </div>
        <div className="radio-card-middle-header">
          <div style={{ width: "50%" }}>
            <img width="100%;" src={currentDevice.image} alt="logo2084" />
          </div>
          <div className="radio-card-info">
            <div>
              <span>
                {currentDevice.name} № {currentDevice.number}
              </span>
              <span>S/N: 000000</span>
            </div>
            <div>
              <span>Версия ПО - 1.0а</span>
              <span>Версия АЧ - 1.1а</span>
            </div>
          </div>
        </div>

        <div className="radio-card-bottom-header">
          <div className="radio-card-indicators">
            <TbDeviceIpadCode className="icons" />
            <span>Корпус - </span>
            <span>Закрыт </span>
          </div>
          <div className="radio-card-indicators">
            <GiBattery50 className="icons" />
            <span>Батарея - 90%</span>
            <span>Норма </span>
          </div>

          <div className="radio-card-indicators">
            <FaSignal className="icons" />
            <span>Уровень сигнала - </span>
            <span>5 (хороший) </span>
          </div>
          <div className="radio-card-indicators">
            <RiRouterLine className="icons" />
            <span>Ретранслятор - </span>
            <span>1-2-3 </span>
          </div>
          <div className="radio-card-indicators">
            <FaTemperatureEmpty className="icons" />
            <span>Температура - </span>
            <span>22°С </span>
          </div>
        </div>
      </header>
      <div className="radio-card-content">
        {currentDevice.zone.map((item: number | null, i: number) => {
          return (
            <div key={i} className="radio-card-one">
              <div className="radio-card-inside">
                <div className="radio-card-block">
                  <div className="radio-card-block-row">
                    <span>{i === 0 ? "Осн.зона" : "Доп.зона"}</span>
                    <input />
                  </div>
                  <div className="radio-card-block-row">
                    <span>Рзд.</span>
                    <input />
                  </div>
                  <div>
                    <input className="radio-card-block-custom-input" placeholder="Псевдоним" />
                  </div>
                </div>
                <div className="radio-card-block">
                  <span style={{ marginRight: "8px" }}>Тип</span>
                  <select name="" id="">
                    <option>Охранная с зад.(Проходная) с контр. взлома</option>
                    <option value="Охранная">Охранная</option>
                  </select>
                </div>
                {item && (
                  <div className="radio-card-block">
                    <div className="radio-card-block-row">
                      <span>Задержка вход</span>
                      <input width="30px" />
                    </div>
                    <div className="radio-card-block-row">
                      <span>Задержка выход</span>
                      <input width="30px" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="radio-card-one">
          <div className="radio-card-inside">
            <div className="radio-card-block">
              <div>
                <span style={{ marginRight: "8px" }}>Элемент питания</span>
              </div>
              <select name="" id="">
                <option>ER14250(3,6 В)</option>
                <option value="Охранная">ER14250</option>
              </select>
            </div>

            <div className="radio-card-checkbox-block">
              <div className="radio-card-checkbox-row">
                <span>Контролировать датчик саботажа</span>
                <input type="checkbox" />
              </div>
              <div className="radio-card-checkbox-row">
                <span>Контролировать датчик вскрытия</span>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="radio-card-delete">
        <span onClick={deleteDevice}>Удалить устройство</span>
      </button>
    </div>
  );
};

export default RadioCard;
