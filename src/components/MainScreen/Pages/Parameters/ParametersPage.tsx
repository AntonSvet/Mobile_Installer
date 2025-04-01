import { useState } from "react";
import FullScreenSettingDevice from "../../../../utils/FullScreenDialog/FullScreenSettingDevice";
import "./parametersPage.css";
import { dialogTitlesParametrs } from "../../../../const/const";
const ParametersPage = () => {
  const [tab, setTab] = useState("");
  return (
    <>
      <div className="navigation-header-param">
        <div className="navigation-select">
          <select style={{ width: "270px" }} name="" id="">
            <option>Основной канал LAN</option>
            <option>Основной канал LAN</option>
          </select>
          <select style={{ width: "270px" }} name="" id="">
            <option>GSM-антенна встроенная</option>
            <option>GSM-антенна встроенная</option>
          </select>
        </div>
      </div>
      {Object.values(dialogTitlesParametrs).map((el, i) => {
        return (
          <button key={i} onClick={() => setTab(el)} className="parameters-page-button">
            <span>{el}</span>
          </button>
        );
      })}

      {tab && <FullScreenSettingDevice open={tab ? true : false} handleClose={() => setTab("")} title={tab} />}
    </>
  );
};

export default ParametersPage;
