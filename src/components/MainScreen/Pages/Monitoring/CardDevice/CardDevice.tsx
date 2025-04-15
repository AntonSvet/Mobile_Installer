import { useState } from "react";
import "./cardDevice.css"; // Подключаем CSS-стили
import { IRadioDevices } from "../../../../../redux/reducers/devices/devices.types";
import { GiBattery50 } from "react-icons/gi";
import { FaSignal } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";

interface CardDeviceProps {
  openSettingModal: () => void;
  el: IRadioDevices;
  index: number;
}

const CardDevice = ({ openSettingModal, el, index }: CardDeviceProps) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const armCondition = useTypedSelector((state) => state.devices.secured);
  const handleClick = () => {
    setSelectedCard(index);
    openSettingModal();
  };

  return (
    <div key={index} className={`card ${selectedCard === index ? "selected" : ""}`} onClick={handleClick}>
      <div className="card-content">
        <div className="status-bar" style={{ background: el.statusDevice }}></div>
        <div className="content">
          <div className="main-content">
            <div className="image-device">
              {el.name !== "Кл Ю-6270" ? (
                <img src={el.image} alt="logo2084" />
              ) : (
                <img style={{ padding: "6px 25px 0px 20px" }} src={el.image} alt={el.name} />
              )}
            </div>

            <div className="device-content">
              <div className="text">
                <span className="text-fullName">{el.fullName}</span>
              </div>
              <div>
                <div className="row">
                  <div className="text">
                    {el.name !== "Кл Ю-6270" ? (
                      <span>
                        Беспровод. зона {el.zone[0]}, рзд. {el.section[0]}
                      </span>
                    ) : (
                      <span>
                        Радио клавиатура {el.zone[0]}, рзд. {el.section[0]}
                      </span>
                    )}
                    <FaRegClock className="clock-icon" />
                  </div>
                  <div className="status-indicator" style={{ background: armCondition }}></div>
                </div>
                <div className="row">
                  <div className="text">
                    {el.zone[1] === null ? (
                      <span className="additional-zone">Дополн. зона {el.zone[1]}</span>
                    ) : el.zone[1] ? (
                      <span>
                        Дополн. зона {el.zone[1]}, рзд {el.section[1]}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  {el.statusZone[1] && <div className="status-indicator" style={{ background: armCondition }}></div>}
                </div>
              </div>
            </div>
          </div>

          <div className="footer">
            <div className="footer-left">
              <div className="text">
                <span>
                  {el.name} №{el.number}
                </span>
              </div>
              <div className="signal-icon">
                <FaSignal />
              </div>
              <div className="battery-icon">
                <GiBattery50 />
                {el.name === "Кл Ю-6270" && <GiBattery50 className="icons" />}
              </div>
            </div>
            <div className="text">
              <span>22°C{el.temperature}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDevice;
