import { useState } from "react";
import "./cardDevice.css";
import { IRadioDevices } from "../../../../../redux/reducers/devices/devices.types";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";

interface CardDeviceProps {
  openSettingModal: () => void;
  el: IRadioDevices;
  index: number;
}

const RScardDevice = ({ openSettingModal, el, index }: CardDeviceProps) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const armCondition = useTypedSelector((state) => state.devices.secured);
  const handleClick = () => {
    setSelectedCard(index);
    openSettingModal();
  };

  return (
    <div
      style={{ minHeight: "260px" }}
      key={index}
      className={`card ${selectedCard === index ? "selected" : ""}`}
      onClick={handleClick}
    >
      <div className="card-content">
        <div className="status-bar" style={{ background: el.statusDevice, minHeight: "260px" }}></div>
        <div className="content">
          <div className="main-content">
            <div className="image-device">
              <img src={el.image} alt={el.name} />
            </div>

            <div className="device-content">
              <div className="text">
                <span className="text-fullName">{el.fullName}</span>
              </div>
              <div>
                {el.zone.map((item: number | null, i: number) => {
                  if (item === null) return null;
                  return (
                    <div key={i} className="row">
                      <div className="text">
                        <span>
                          Проводная зона {item}, рзд. {el.section[i]}
                        </span>
                      </div>
                      <div className="status-indicator" style={{ background: armCondition }}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="footer" style={{ marginLeft: "8px" }}>
            <div className="text">
              <span>
                {el.name} №{el.number}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RScardDevice;
