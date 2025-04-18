import "../../../templateCard.css";
import { GiBattery50 } from "react-icons/gi";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { FaSignal } from "react-icons/fa";
import { RiRouterLine } from "react-icons/ri";
import { TbDeviceIpadCode } from "react-icons/tb";
import { IRadioDevices } from "../../../../../../redux/reducers/devices/devices.types";
import { useRef } from "react";
import useResizeObserver from "../../../../../../hooks/useResizeObserver";
import CustomInput from "../../../../../../common/CustomInput/CustomInput";
import BaseHeader from "../../../../../../common/BaseHeader/BaseHeader";
import SensorInfoBlock from "../../../../../../common/SensorInfoBlock/SensorInfoBlock";
import DeleteFooter from "../../../../../../common/DeleteFooter/DeleteFooter";
interface RadioCardProps {
  handleCloseModal: () => void;
  currentDevice: IRadioDevices;
}

const RadioCard = ({ handleCloseModal, currentDevice }: RadioCardProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useResizeObserver(headerRef);

  return (
    <div className="template-card">
      <BaseHeader handleCloseModal={handleCloseModal} currentDeviceName={currentDevice.fullName} ref={headerRef} />
      <div className="template-card-middle-header-block">
        <SensorInfoBlock
          headerHeight={headerHeight}
          currentDeviceName={currentDevice.name}
          currentDeviceNumber={currentDevice.number}
          currentDeviceImage={currentDevice.image}
          versionPo={"1.0а"}
          versionAp={"1.1a"}
          sn={"000000"}
          imageClassName={"template-card-middle-header-image"}
          imageWidth={"50%"}
        />
        <div className="template-card-bottom-header">
          <div className="template-card-indicators">
            <TbDeviceIpadCode className="icons" />
            <span>Корпус - </span>
            <span>Закрыт </span>
          </div>
          <div className="template-card-indicators">
            <GiBattery50 className="icons" />
            <span>Батарея - 90%</span>
            <span>Норма </span>
          </div>

          <div className="template-card-indicators">
            <FaSignal className="icons" />
            <span>Уровень сигнала - </span>
            <span>5 (хороший) </span>
          </div>
          <div className="template-card-indicators">
            <RiRouterLine className="icons" />
            <span>Ретранслятор - </span>
            <span>1-2-3 </span>
          </div>
          <div className="template-card-indicators">
            <FaTemperatureEmpty className="icons" />
            <span>Температура - </span>
            <span>22°С </span>
          </div>
        </div>
      </div>
      <div className="template-card-content">
        {currentDevice.zone.map((item: number | null, i: number) => {
          return (
            <div key={i} className="template-card-one">
              <div className="template-card-status-bar-container">
                <div className="template-card-status-bar" style={{ backgroundColor: "red" }}></div>
                <div className="template-card-inside">
                  <div className="template-card-block">
                    <div className="template-card-block-row">
                      <span>{i === 0 ? "Осн.зона" : "Доп.зона"}</span>
                      <CustomInput size="small" />
                    </div>
                    <div className="template-card-block-row">
                      <span>Рзд.</span>
                      <CustomInput size="small" />
                    </div>
                    <div>
                      <CustomInput placeholder="Псевдоним" size="medium" />
                    </div>
                  </div>
                  <div className="template-card-block">
                    <span style={{ marginRight: "8px" }}>Тип</span>
                    <select name="" id="">
                      <option>Не используется</option>
                      <option value="Охранная">Охранная</option>
                      {!currentDevice.name.includes("5830") || i === 1 ? (
                        <>
                          <option>Охранная с задержкой (вход/выход)</option>
                          <option>Охранная с задержкой (Проходная)</option>
                          <option>Охранная с фикс. зад.(вход/выход)</option>
                        </>
                      ) : (
                        ""
                      )}
                      {i === 1 ? (
                        <>
                          <option>Тревожная (КТС)</option>
                          <option>ПАТРУЛЬ</option>
                          <option>УПРАВЛЕНИЕ</option>
                          <option>ГАЗ</option>
                          <option>ВОДА</option>
                          <option>ТЕХНОЛОГИЧЕСКАЯ</option>
                        </>
                      ) : (
                        ""
                      )}
                    </select>
                  </div>
                  {item && (
                    <div className="template-card-block">
                      <div className="template-card-block-row">
                        <span>Задержка вход</span>
                        <CustomInput size="small" />
                      </div>
                      <div className="template-card-block-row">
                        <span>Задержка выход</span>
                        <CustomInput size="small" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className="template-card-one">
          <div className="template-card-inside">
            <div className="template-card-block">
              <div>
                <span style={{ marginRight: "8px" }}>Элемент питания</span>
              </div>
              <select name="" id="">
                <option>ER14250(3,6 В)</option>
                <option value="Охранная">ER14250</option>
              </select>
            </div>

            <div className="template-card-checkbox-block">
              <div className="template-card-checkbox-row">
                <span>Контролировать датчик саботажа</span>
                <CustomInput size="small" type="checkbox" />
              </div>
              <div className="template-card-checkbox-row">
                <span>Контролировать датчик вскрытия</span>
                <CustomInput size="small" type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteFooter handleCloseModal={handleCloseModal} currentDevice={currentDevice} />
    </div>
  );
};

export default RadioCard;
