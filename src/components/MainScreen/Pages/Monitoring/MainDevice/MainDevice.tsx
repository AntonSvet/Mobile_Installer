// import { GiBattery50 } from "react-icons/gi";
import { RiServerLine } from "react-icons/ri";
import { GiBatteryMinus } from "react-icons/gi";
import { FaSignal } from "react-icons/fa";
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

interface RadioCardProps {
  handleCloseModal: () => void;
}

const MainDevice = ({ handleCloseModal }: RadioCardProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useResizeObserver(headerRef);

  return (
    <div className="sensor-card">
      <SensorHeader handleCloseModal={handleCloseModal} currentDeviceName="Юпитер-2084" ref={headerRef} />
      <div className="sensor-card-middle-header-block">
        <SensorInfoBlock
          headerHeight={headerHeight}
          currentDeviceName={"УОО Ю"}
          currentDeviceNumber={2084}
          currentDeviceImage={device2084}
          versionPo={"1.0а"}
          versionAp={null}
          sn={null}
          imageClassName={"sensor-card-middle-header-device-image"}
        />
      </div>

      <div className="sensor-card-bottom-header">
        <span className="sensor-card-bottom-header-title">ID: 0000-0099-6CAC</span>
        <div className="sensor-card-indicators">
          <RiServerLine className="icons" />
          <span>Связь с сервером - </span>
          <span>Ethernet(осн) </span>
        </div>
        <span className="sensor-card-bottom-header-title">IP: 005.017.161.234:10620</span>
        <div className="sensor-card-indicators">
          <TbDeviceIpadCode className="icons" />
          <span>Корпус - </span>
          <span>Закрыт </span>
        </div>
        <div className="sensor-card-indicators">
          <LiaCarBatterySolid className="icons" />
          <span>Питание - основное</span>
        </div>
        <div className="sensor-card-indicators">
          {/* <GiBattery50 className="icons" /> */}
          <GiBatteryMinus className="icons" />
          <span>Акк. - неиспр</span>
        </div>

        <div className="sensor-card-indicators">
          <FaSignal className="icons" />
          <span>Уровень сигнала SIM 1 - </span>
          <span>5 (хороший) </span>
        </div>
        <div className="sensor-card-indicators">
          <RiRouterLine className="icons" />
          <span>Ethernet - </span>
          <span>подключено</span>
        </div>
        <div className="sensor-card-indicators">
          <FaWifi className="icons" />
          <span>Сеть Wi-Fi - </span>
          <span>PO2 </span>
        </div>
      </div>
      <div className="sensor-card-content">
        <span className="sensor-block-title">Зоны</span>
        {[1, 2].map((item: number | null, i: number) => {
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
                      <span>Рзд.</span>
                      <CustomInput />
                    </div>
                    <div>
                      <CustomInput placeholder="Псевдоним" />
                    </div>
                  </div>
                  <div className="sensor-card-block">
                    <span style={{ marginRight: "8px" }}>Тип</span>
                    <select name="" id="">
                      <option>Не используется</option>
                      <option value="Охранная">Охранная</option>
                      {i === 0 ? (
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
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <span className="sensor-block-title">Выходы управления</span>
        <div className="sensor-card-one">
          <div className="sensor-card-inside">
            <div className="sensor-card-block">
              <div>
                <span style={{ marginRight: "8px" }}>Выход инд. Рзд.</span>
              </div>
              <select name="" id="">
                {Array(32)
                  .fill(1)
                  .map((_, i) => {
                    return <option>{i + 1} раздел</option>;
                  })}
              </select>
            </div>

            <div className="sensor-card-block">
              <div>
                <span style={{ marginRight: "8px" }}>Режим</span>
              </div>
              <select name="" id="">
                <option>Включен всегда</option>;
                {Array(6)
                  .fill(5)
                  .map((_, i) => {
                    return <option>Гашение через {(i + 1) * 5} сек</option>;
                  })}
              </select>
            </div>
          </div>
        </div>
        {[1, 2].map((item: number | null, i: number) => {
          return (
            <div key={i} className="sensor-card-one">
              <div className="sensor-card-status-bar-container">
                <div className="sensor-card-inside">
                  <div className="sensor-card-block">
                    <div className="sensor-card-block-row">
                      <span>Выход ОК-{i + 1} </span>
                      <CustomInput />
                    </div>
                    <div className="sensor-card-block-row">
                      <span>Рзд.</span>
                      <button>1,3,5-7,10</button>
                    </div>
                  </div>
                  <div className="sensor-card-block">
                    <span style={{ marginRight: "8px" }}>Режим</span>
                    <select name="" id="">
                      <option>Не используется</option>
                      <option value="Охранная">Охранная</option>
                      {i === 0 ? (
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
                    <div className="sensor-card-block">
                      <div className="sensor-card-block-row">
                        <span>Время работы</span>
                        <CustomInput />
                      </div>
                      <div className="sensor-card-block-row">
                        <span>Инд. вз/сн</span>
                        <input type="checkbox" />
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
