import "../sensorCard.css";
import { IRadioDevices } from "../../../../../../redux/reducers/devices/devices.types";
import { TbDeviceIpadCode } from "react-icons/tb";
import { LiaCarBatterySolid } from "react-icons/lia";
import IconRS485 from "./IconRS485";
import { useRef } from "react";
import useResizeObserver from "../../../../../../hooks/useResizeObserver";
import CustomInput from "../../../../../../common/CustomInput/CustomInput";
import BaseHeader from "../../../../../../common/BaseHeader/BaseHeader";
import SensorInfoBlock from "../../../../../../common/SensorInfoBlock/SensorInfoBlock";
import DeleteFooter from "../../../../../../common/DeleteFooter/DeleteFooter";
interface SettingRSCardProps {
  handleCloseModal: () => void;
  currentDevice: IRadioDevices;
}
const SettingRSCard = ({ handleCloseModal, currentDevice }: SettingRSCardProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useResizeObserver(headerRef);

  return (
    <div className="sensor-card">
      <BaseHeader handleCloseModal={handleCloseModal} currentDeviceName={currentDevice.fullName} ref={headerRef} />
      <div className="sensor-card-middle-header-block" >
        <SensorInfoBlock
          headerHeight={headerHeight}
          currentDeviceName={currentDevice.name}
          currentDeviceNumber={currentDevice.number}
          currentDeviceImage={currentDevice.image}
          versionPo={"1.0а"}
          versionAp={null}
          sn={null}
          imageClassName={"sensor-card-middle-header-image"} />

        <div className="sensor-card-bottom-header">
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
      </div>
      <div className="sensor-card-content">
        {currentDevice.zone.map((_item: number | null, i: number) => {
          return (
            <div key={i} className="sensor-card-one">
              <div className="sensor-card-status-bar-container">
                <div className="sensor-card-status-bar" style={{ backgroundColor: "red" }}></div>
                <div className="sensor-card-inside">
                  <div className="sensor-card-block">
                    <div className="sensor-card-block-row">
                      <span>Зона</span>
                      <CustomInput />
                    </div>
                    <div className="sensor-card-block-row">
                      <span>Разд.</span>
                      <CustomInput />
                    </div>
                    <div>
                      <CustomInput placeholder="Псевдоним" />
                    </div>
                  </div>
                  <div className="sensor-card-block">
                    <span style={{ marginRight: "8px" }}>Тип</span>
                    <select name="" id="">
                      <option>Охранная с зад.(Проходная) с контр. взлома</option>
                      <option value="Охранная">Охранная</option>
                    </select>
                  </div>
                  <div className="sensor-card-block">
                    <div className="sensor-card-block-row">
                      <span>Задержка вход</span>
                      <CustomInput />
                    </div>
                    <div className="sensor-card-block-row">
                      <span>Задержка выход</span>
                      <CustomInput />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <DeleteFooter handleCloseModal={handleCloseModal} currentDevice={currentDevice} />
      </div>
    </div>

  );
};

export default SettingRSCard;
