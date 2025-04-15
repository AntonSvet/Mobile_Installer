import { FaRegSave } from "react-icons/fa";
import CustomInput from "../../../../../../common/CustomInput/CustomInput";

interface GPRSProps {
  title: string;
  handleCloseModal: () => void;
}

export default function GPRS({ title, handleCloseModal }: GPRSProps) {
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
          <div className="radio-card-save">
            <FaRegSave className="radio-card-top-header-icons" />
          </div>
        </div>

        <div className="navigation-header-ethernet-tab">
          <div className="mac-ethernet-tab">
            <span>IMEI GSM модема</span>
            <span>864626048450115</span>
          </div>
          <div className="navigation-select-ethernet-tab">
            <select name="" id="">
              <option>Включить GPRS</option>
              <option>Выключить GPRS</option>
            </select>
          </div>
        </div>
      </header>
      <span>Настройки SIM-Карты 1</span>
      <div className="ethernet-tab-one">
        <span>Адреса серверов:</span>
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
        <span>Настройки APN</span>
        <div className="navigation-select-ethernet-tab">
          <select name="" id="">
            <option>настроить вручную</option>
            <option>автоматически</option>
            <option>Билайн</option>
            <option>МТС</option>
            <option>Мегафон</option>
            <option>Теле 2</option>
          </select>
          <CustomInput placeholder="APN-сервер" />
          <CustomInput placeholder="Логин" />
          <CustomInput placeholder="Пароль" />
        </div>
      </div>
      <span>Настройки SIM-Карты 2</span>
      <div className="ethernet-tab-one">
        <span>Адреса серверов:</span>
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
        <span>Настройки APN</span>
        <div className="navigation-select-ethernet-tab">
          <select name="" id="">
            <option>настроить вручную</option>
            <option>автоматически</option>
            <option>Билайн</option>
            <option>МТС</option>
            <option>Мегафон</option>
            <option>Теле 2</option>
          </select>
          <CustomInput placeholder="APN-сервер" />
          <CustomInput placeholder="Логин" />
          <CustomInput placeholder="Пароль" />
        </div>
      </div>
    </div>
  );
}
