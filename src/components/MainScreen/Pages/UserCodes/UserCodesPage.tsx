import "./userCode.css";
const UserCodesPage = () => {
  return (
    <div
      style={{
        marginTop: "43px",
      }}
    >
      {Array(250)
        .fill(1)
        .map((_, i) => (
          <div key={i} className="user-code-page-one">
            <div style={{ display: "flex", alignItems: "center", borderRight: "2px solid black" }}>
              <span className="vertical-text">{i + 1}</span>
            </div>

            <div className="user-code-page-inside">
              <div
                style={{
                  justifyContent: "space-between",
                }}
                className="user-code-page-block "
              >
                <div className="user-code-page-block-row">
                  <span>Код</span> <input style={{ width: "150px" }} type="text" />
                </div>
                <div className="user-code-page-block-row">
                  <span>Рзд.</span>
                  <input style={{ width: "120px" }} type="text" />
                </div>
              </div>
              <div className="user-code-page-block">
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>Режим</span>
                <select style={{ width: "270px" }} name="" id="">
                  <option>Включение выхода управления</option>
                  <option value="Включение выхода управления">Включение выхода управления</option>
                </select>
              </div>

              <div className="user-code-page-block">
                <div className="user-code-page-block-row">
                  <input style={{ width: "170px" }} placeholder="Псевдоним" type="text" />
                </div>
                <button className="user-code-delete-button">Удалить</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserCodesPage;
