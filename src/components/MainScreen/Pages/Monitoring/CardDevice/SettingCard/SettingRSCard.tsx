import "../../../templateCard.css";
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
    <div className="template-card">
      <BaseHeader handleCloseModal={handleCloseModal} currentDeviceName={currentDevice.fullName} ref={headerRef} />
      <div className="template-card-middle-header-block" >
        <SensorInfoBlock
          headerHeight={headerHeight}
          currentDeviceName={currentDevice.name}
          currentDeviceNumber={currentDevice.number}
          currentDeviceImage={currentDevice.image}
          versionPo={"1.0а"}
          versionAp={null}
          sn={null}
          imageClassName={"template-card-middle-header-image"}
          imageWidth={"50%"} />

        <div className="template-card-bottom-header">
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
      <div className="template-card-content">
        {currentDevice.zone.map((_item: number | null, i: number) => {
          return (
            <div key={i} className="template-card-one">
              <div className="template-card-status-bar-container">
                <div className="template-card-status-bar" style={{ backgroundColor: "red" }}></div>
                <div className="template-card-inside">
                  <div className="template-card-block">
                    <div className="template-card-block-row">
                      <span>Зона</span>
                      <CustomInput size="small" type="number" />
                    </div>
                    <div className="template-card-block-row">
                      <span>Разд.</span>
                      <CustomInput size="small" type="number" />
                    </div>
                    <div>
                      <CustomInput placeholder="Псевдоним" size="medium" type="text" />
                    </div>
                  </div>
                  <div className="template-card-block">
                    <span style={{ marginRight: "8px" }}>Тип</span>
                    <select name="" id="">
                      <option>Охранная с зад.(Проходная) с контр. взлома</option>
                      <option value="Охранная">Охранная</option>
                    </select>
                  </div>
                  <div className="template-card-block">
                    <div className="template-card-block-row">
                      <span>Задержка вход</span>
                      <CustomInput size="small" type="number" />
                    </div>
                    <div className="template-card-block-row">
                      <span>Задержка выход</span>
                      <CustomInput size="small" type="number" />
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
