// import { GiBattery50 } from "react-icons/gi";
import { RiServerLine } from "react-icons/ri";
import { GiBatteryMinus } from "react-icons/gi";
import { FaSignal } from "react-icons/fa";
import "../../templateCard.css";
import { RiRouterLine } from "react-icons/ri";
import { TbDeviceIpadCode } from "react-icons/tb";
import device2084 from "../../../../../img/device/s_fonom_2084.png";
import { useRef } from "react";
import useResizeObserver from "../../../../../hooks/useResizeObserver";
import CustomInput from "../../../../../common/CustomInput/CustomInput";
import { FaWifi } from "react-icons/fa";
import { LiaCarBatterySolid } from "react-icons/lia";
import SensorHeader from "../../../../../common/BaseHeader/BaseHeader";
import SensorInfoBlock from "../../../../../common/SensorInfoBlock/SensorInfoBlock";
import CustomSelect from "../../../../../common/CustomSelector/CustomSelector";

interface RadioCardProps {
  handleCloseModal: () => void;
}
const typeOptions = [
  { value: '1', label: 'Не используется' },
  { value: '2', label: 'Охранная' },
];
const typeOptionsVar1 = [
  { value: '1', label: 'Не используется' },
  { value: '2', label: 'Охранная' },
  { value: '3', label: 'Охранная с задержкой (вход/выход)' },
  { value: '4', label: 'Охранная с задержкой (Проходная)' },
  { value: '5', label: 'Охранная с фикс. зад.(вход/выход)' },
];
const typeOptionsVar2 = [
  { value: '1', label: 'Не используется' },
  { value: '2', label: 'Охранная' },
  { value: '3', label: 'Тревожная (КТС)' },
  { value: '4', label: 'ПАТРУЛЬ' },
  { value: '5', label: 'УПРАВЛЕНИЕ' },
  { value: '6', label: 'ГАЗ' },
  { value: '7', label: 'ВОДА' },
  { value: '8', label: 'ТЕХНОЛОГИЧЕСКАЯ' },
];
const optionsArray = Array(6).fill(5).map((_, i) => {
  return { value: (i + 1) * 5, label: `Гашение через ${(i + 1) * 5} сек` };
});
const modeOptions = [{ value: '1', label: 'Включен всегда' }, ...optionsArray];



const MainDevice = ({ handleCloseModal }: RadioCardProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useResizeObserver(headerRef);

  return (
    <div className="template-card">
      <SensorHeader handleCloseModal={handleCloseModal} currentDeviceName="Юпитер-2084" ref={headerRef} />
      <div className="template-card-middle-header-block">
        <SensorInfoBlock
          headerHeight={headerHeight}
          currentDeviceName={"УОО Ю"}
          currentDeviceNumber={2084}
          currentDeviceImage={device2084}
          versionPo={"1.0а"}
          versionAp={null}
          sn={null}
          imageClassName={"template-card-middle-header-device-image"}
          imageWidth={"50%"}
        />
      </div>

      <div className="template-card-bottom-header">
        <span className="template-card-bottom-header-title">ID: 0000-0099-6CAC</span>
        <div className="template-card-indicators">
          <RiServerLine className="icons" />
          <span>Связь с сервером - </span>
          <span>Ethernet(осн) </span>
        </div>
        <span className="template-card-bottom-header-title">IP: 005.017.161.234:10620</span>
        <div className="template-card-indicators">
          <TbDeviceIpadCode className="icons" />
          <span>Корпус - </span>
          <span>Закрыт </span>
        </div>
        <div className="template-card-indicators">
          <LiaCarBatterySolid className="icons" />
          <span>Питание - основное</span>
        </div>
        <div className="template-card-indicators">
          {/* <GiBattery50 className="icons" /> */}
          <GiBatteryMinus className="icons" />
          <span>Акк. - неиспр</span>
        </div>

        <div className="template-card-indicators">
          <FaSignal className="icons" />
          <span>Уровень сигнала SIM 1 - </span>
          <span>5 (хороший) </span>
        </div>
        <div className="template-card-indicators">
          <RiRouterLine className="icons" />
          <span>Ethernet - </span>
          <span>подключено</span>
        </div>
        <div className="template-card-indicators">
          <FaWifi className="icons" />
          <span>Сеть Wi-Fi - </span>
          <span>PO2 </span>
        </div>
      </div>
      <div className="template-card-content">
        <span className="sensor-block-title">Зоны</span>
        {[1, 2].map((item: number | null, i: number) => {
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
                      <span>Рзд.</span>
                      <CustomInput size="small" type="number" />
                    </div>
                    <div>
                      <CustomInput placeholder="Псевдоним" size="medium" type="text" />
                    </div>
                  </div>
                  <div className="template-card-block">
                    <span style={{ marginRight: "8px" }}>Тип</span>
                    <CustomSelect options={i === 0 ? typeOptionsVar1 : i === 1 ? typeOptionsVar2 : typeOptions} />
                  </div>
                  {item && (
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
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <span className="template-card-block-title">Выходы управления</span>
        <div className="template-card-one">
          <div className="template-card-inside">
            <div className="template-card-block">
              <div className="template-card-block-row">
                <span >Выход инд. Рзд.</span>
              </div>
              <CustomSelect options={Array(32)
                .fill(1)
                .map((_, i) => {
                  return { value: i + 1, label: `${i + 1} раздел` };
                })} width="55%" />
            </div>

            <div className="template-card-block">
              <div>
                <span style={{ marginRight: "8px" }}>Режим</span>
              </div>
              <CustomSelect options={modeOptions} />
            </div>
          </div>
        </div>
        {[1, 2].map((item: number | null, i: number) => {
          return (
            <div key={i} className="template-card-one">
              <div className="template-card-status-bar-container">
                <div className="template-card-inside">
                  <div className="template-card-block">
                    <div className="template-card-block-row">
                      <span>Выход ОК-{i + 1} </span>
                      <CustomInput size="small" type="number" />
                    </div>
                    <div className="template-card-block-row">
                      <span>Рзд.</span>
                      <button>1,3,5-7,10</button>
                    </div>
                  </div>
                  <div className="template-card-block">
                    <span style={{ marginRight: "8px" }}>Режим</span>
                    <CustomSelect options={[
                      { value: '1', label: 'Не используется' },
                      { value: '2', label: 'Охранная' }]} />
                  </div>
                  {item && (
                    <div className="template-card-block">
                      <div className="template-card-block-row">
                        <span>Время работы</span>
                        <CustomInput size="small" type="number" />
                      </div>
                      <div className="template-card-block-row">
                        <span>Инд. вз/сн</span>
                        <CustomInput size="small" type="checkbox" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainDevice;
