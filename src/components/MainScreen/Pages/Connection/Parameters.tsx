import { useState } from "react";
import FullScreenSettingDevice from "../../../../utils/FullScreenDialog/FullScreenSettingDevice";
import "./parametersPage.css";
import { dialogTitlesParametrs } from "../../../../const/const";
import { FaRegSave } from "react-icons/fa";

interface ParametersProps {
  title: string;
  handleCloseModal: () => void;
}

const Parameters = ({ title, handleCloseModal }: ParametersProps) => {
  const [tab, setTab] = useState("");
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

        <div className="navigation-header-param">
          <div className="navigation-select">
            <select style={{ width: "270px" }} name="" id="">
              <option>Основной канал LAN</option>
              <option>Основной канал LAN</option>
            </select>
          </div>
        </div>
      </header>

      {Object.values(dialogTitlesParametrs).map((el, i) => {
        return (
          <button key={i} onClick={() => setTab(el)} className="parameters-page-button">
            <span>{el}</span>
          </button>
        );
      })}

      {tab && <FullScreenSettingDevice open={tab ? true : false} handleClose={() => setTab("")} title={tab} />}
    </div>
  );
};

export default Parameters;
