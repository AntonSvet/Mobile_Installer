
import CustomInput from "../../../../common/CustomInput/CustomInput";
import "./smsNotification.css";
export default function SMSnotificationPage() {

  return (
    <div className="template-card">
      <div className="template-card-content" style={{ marginTop: `16px` }}>
        {Array(9)
          .fill(1)
          .map((_, i) => (
            <div className="template-card-one">
              <div key={i} className="template-card-inside" style={{ flexDirection: "row", width: "100%" }}>
                <div className="sms-number" >
                  <span className="sms-number-vertical-text">{i + 1}</span>
                </div>

                <div className="template-card-block" style={{ width: "100%" }}>
                  <div
                    className="template-card-inside "
                  >
                    <div
                      className="template-card-block "
                    >
                      <div className="template-card-block-row">
                        <span>Номер телефона</span>
                      </div>
                      <div className="template-card-block-row">
                        <CustomInput placeholder="" size="big" type="number" />
                      </div>
                    </div>
                    <div className="template-card-block">
                      <button className="sms-delete-button" style={{ width: "100%" }} name="" id="">
                        <span>Набор сообщений для отправки</span>
                      </button>
                    </div>
                    <div className="template-card-block">
                      <button className="sms-delete-button" style={{ width: "100%" }} >
                        <span>Привязка к разделам</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div >
  );
}

