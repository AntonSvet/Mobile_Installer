import { useState } from "react";
import FullScreenSettingDevice from "../../../../utils/FullScreenDialog/FullScreenSettingDevice";
import "./parametersPage.css";

const ConnectionPage = () => {
  const [tab, setTab] = useState("");
  return (
    <div style={{ display: "flex", marginTop: "25px", flexDirection: "column", alignItems: "center" }}>
      <button disabled onClick={() => setTab("el")} className="parameters-page-button">
        <span style={{ color: "grey" }}>Использовать автоматическое подключение к ПЦО</span>
      </button>
      <button disabled onClick={() => setTab("el")} className="parameters-page-button">
        <span>Подключиться к ПЦО используя настроенные параметры</span>
      </button>
      <button onClick={() => setTab("Параметры связи")} className="parameters-page-button">
        <span>Настроить параметры связи для подключения к ПЦО </span>
      </button>

      {tab && <FullScreenSettingDevice open={tab ? true : false} handleClose={() => setTab("")} title={tab} />}
    </div>
  );
};

export default ConnectionPage;
