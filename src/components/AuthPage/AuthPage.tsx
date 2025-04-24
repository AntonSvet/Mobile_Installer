import { useTheme } from "./../../hooks/useTheme";
import { useState, useEffect } from "react";
import LogoCube from "../../common/LogoCube/LogoCube";
import MainScreen from "../MainScreen/MainScreen";
import "./authPage.css";

import Html5QrScanner from "../../utils/QRScan/QRScan";

const AuthPage = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  if (scannedData) {
    return <MainScreen scannedData={scannedData} />;
  }
  function callback(data: string) {
    setScannedData(data);
  }
  return (
    <header className="app-header">
      <div
        style={{
          top: isScanning ? "0px" : "15%",
        }}
        className="logo-elesta"
      >
        {!isScanning && <LogoCube />}
      </div>
      <div
        style={{
          display: isScanning ? "block" : "none",
        }}
        className="camera-container"
      >
        {isScanning && <Html5QrScanner callback={callback} />}
      </div>
      <div className="qr-scan-view">
        {!isScanning && (
          <>
            <p>Введите ID6 или отсканируйте QR-Code</p>
            <div className="input-with-button">
              <input type="text" pattern="[0-9A-Fa-f]" placeholder="Введите ID6 " className="input-field" />
              <button onClick={() => setScannedData("текст")} type="submit" className="submit-button">
                Отправить
              </button>
            </div>
          </>
        )}

        <button onClick={() => setIsScanning((prev) => !prev)} className="qr-scan-button">
          <div className="qr-icon">&#x1F4F7;</div>
          <div className="qr-text">{isScanning ? "Отмена" : "Сканировать QR-код"}</div>
        </button>
      </div>
    </header>
  );
};

export default AuthPage;
