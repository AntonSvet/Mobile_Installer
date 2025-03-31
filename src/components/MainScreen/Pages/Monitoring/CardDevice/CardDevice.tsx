import { useState } from "react";
import "./cardDevice.css"; // Подключаем CSS-стили
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import Battery20SharpIcon from "@mui/icons-material/Battery20Sharp";

const CardDevice = ({ openSettingModal, el, index }: any) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClick = () => {
    setSelectedCard(index);
    openSettingModal();
  };

  return (
    <div key={index} className={`card ${selectedCard === index ? "selected" : ""}`} onClick={handleClick}>
      <div className="card-content">
        <div className="status-bar" style={{ background: el.stutusDevice }}></div>
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
                <span style={{ fontWeight: "700", fontSize: "17px" }}>{el.fullName}</span>
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
                  </div>
                  <div className="status-indicator" style={{ background: el.statusZone[0] }}></div>
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
                  {el.statusZone[1] && (
                    <div className="status-indicator" style={{ background: el.statusZone[1] }}></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="footer" style={{ marginLeft: "5px" }}>
            <div className="text">
              <span style={{ fontSize: "17px" }}>
                {el.name} №{el.number}
              </span>
            </div>
            <div className="signal-icon">
              <SignalCellular2BarIcon />
            </div>
            <div className="battery-icon">
              <Battery20SharpIcon />
              {el.name === "Кл Ю-6270" && <Battery20SharpIcon />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDevice;
