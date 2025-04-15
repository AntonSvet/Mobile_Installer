export default function SMSnotificationPage() {
  return (
    <>
      <div className="navigation-header-param">
        <div className="navigation-select">
          <select style={{ width: "270px" }} name="" id="">
            <option>Использовать Транслит</option>
            <option>Использовать Кириллица</option>
          </select>
          <select style={{ width: "270px" }} name="" id="">
            <option>SMS резервирует канал связи</option>
            <option>SMS дублирует канал связи</option>
          </select>
        </div>
      </div>
      <div
        style={{
          marginTop: "43px",
        }}
      >
        {Array(9)
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
                    <span>Номер телефона</span> <input style={{ width: "150px" }} type="text" />
                  </div>
                </div>
                <div className="user-code-page-block">
                  <button style={{ width: "270px" }} name="" id="">
                    Набор сообщений для отправки
                  </button>
                </div>

                <div className="user-code-page-block">
                  <div className="user-code-page-block-row">
                    <span>Привязка к разделам</span>
                    <button className="user-code-page-block-row" style={{ width: "120px", height: "22px" }}></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
