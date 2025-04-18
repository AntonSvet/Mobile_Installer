import { useRef, useState } from "react";
import BaseHeader from "../../../../common/BaseHeader/BaseHeader";
import CustomInput from "../../../../common/CustomInput/CustomInput";
import "./userCode.css";
import CustomSelect from "../../../../common/CustomSelector/CustomSelector";
const UserCodesPage = () => {
  const options = [
    { value: '', disabled: true, selected: true, hidden: true, label: 'Выберите режим' },
    { value: '1', label: 'Включение выхода управления' },
    { value: '2', label: 'Включение  управления' },
  ];
  const [selectedOption, setSelectedOption] = useState<string | number>('');
  const headerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="template-card">
      <BaseHeader handleCloseModal={() => { }} currentDeviceName={"Юпитер-2084"} ref={headerRef} />
      <div className="template-card-content" style={{ marginTop: `16px` }}>
        {Array(250)
          .fill(1)
          .map((_, i) => (
            <div className="template-card-one">
              <div key={i} className="template-card-inside" style={{ flexDirection: "row", width: "98%" }}>
                <div className="user-code-number" >
                  <span className="user-code-number-vertical-text">{i + 1}</span>
                </div>

                <div className="template-card-inside">
                  <div
                    className="user-code-block"
                  >
                    <div className="template-card-block-row">
                      <span>Код</span>
                      <CustomInput placeholder="" size="medium" type="number" />
                    </div>
                    <div className="template-card-block-row">
                      <span>Рзд.</span>
                      <CustomInput placeholder="" size="medium" type="text" />
                    </div>
                  </div>
                  <div className="template-card-block">
                    <span style={{ marginRight: "2px" }}>Режим</span>
                    <CustomSelect
                      options={options}
                      value={selectedOption}
                      onChange={setSelectedOption}
                    />
                  </div>

                  <div className="user-code-block">
                    <div className="template-card-block-row">
                      <CustomInput placeholder="Псевдоним" size="big" type="text" />
                    </div>
                    <button className="user-code-delete-button"><span>Удалить</span></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserCodesPage;
