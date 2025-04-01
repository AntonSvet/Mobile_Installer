import "./ethernetTab.css";

interface EthernetTabProps {
  title: string;
  handleCloseModal: () => void;
}

export default function EthernetTab({ title, handleCloseModal }: EthernetTabProps) {
  return (
    <div className="ethernet-tab-card">
      <header>
        <div className="ethernet-tab-card-header-top">
          <div onClick={handleCloseModal} className="ethernet-tab-back-arrow">
            {"<"}
          </div>
          <div className="ethernet-tab-font-size">
            <span>{title}</span>
          </div>
        </div>

        <div className="navigation-header-ethernet-tab">
          <div className="mac-ethernet-tab">
            <span>МАС-адрес</span>
            <span>54:10:EC:93:DB:FF</span>
          </div>
          <div className="navigation-select-ethernet-tab">
            <select name="" id="">
              <option>
                <span>Ethernet</span>
              </option>
              <option>
                <span>Wi-Fi</span>
              </option>
            </select>
            <select name="" id="">
              <option>
                <span>Получать IP-адрес автоматически</span>
              </option>
              <option>
                <span>Получать IP-адрес в ручную</span>
              </option>
            </select>
          </div>
        </div>
      </header>
      <div className="ethernet-tab-one">
        <div className="ethernet-tab-block">
          <div className="ethernet-tab-block-row">
            <span>IP</span> <input style={{ width: "200px" }} type="text" />
          </div>
          <div className="ethernet-tab-block-row">
            <span>порт</span>
            <input style={{ width: "80px" }} type="text" />
          </div>
        </div>

        <div className="ethernet-tab-block">
          <div className="ethernet-tab-block-row">
            <span>IP</span> <input style={{ width: "200px" }} type="text" />
          </div>
          <div className="ethernet-tab-block-row">
            <span>порт</span>
            <input style={{ width: "80px" }} type="text" />
          </div>
        </div>

        <div className="ethernet-tab-block">
          <div className="ethernet-tab-block-row">
            <span>IP</span> <input style={{ width: "200px" }} type="text" />
          </div>
          <div className="ethernet-tab-block-row">
            <span>порт</span>
            <input style={{ width: "80px" }} type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}
