import { useTheme } from "./../../hooks/useTheme";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useRef, useState, useEffect } from "react";
import LogoCube from "../../common/LogoCube/LogoCube";
import MainScreen from "../MainScreen/MainScreen";
import "./authPage.css";
import QRScanner from "./QRScanner";
const AuthPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const { theme } = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const codeReader = new BrowserMultiFormatReader();
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const startScanning = async () => {
    setIsScanning(true);

    if (videoRef.current) {
      try {
        await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            setScannedData(result.getText());

            stopScanning();
          }
          if (err && !(err instanceof Error)) {
            console.error(err);
          }
        });
      } catch (error) {
        console.error("Error in QR code scanning:", error);
        alert(`Error in QR code scanning: ${error}`);
        stopScanning();
      }
    }
  };

  const stopScanning = () => {
    codeReader.reset();
    setIsScanning(false);
    videoRef.current = null;
  };
  useEffect(() => {
    return () => {
      if (codeReader) {
        codeReader.reset();
      }
    };
  }, [codeReader]);
  if (scannedData) {
    return <MainScreen />;
  }

  return (
    <header className="app-header">
      <div className="logo-elesta">
        {!isScanning && <LogoCube />}
        <div
          style={{
            display: isScanning ? "block" : "none",
          }}
          className="camera-container"
        >
          {/* <video ref={videoRef} id="camera-preview"></video> */}
          <QRScanner />
          {/*   <div className="scanning-overlay">
            <div className="scan-box">
              <div className="corner-bottom-left"></div>
              <div className="corner-bottom-right"></div>
            </div>
            <div className="scan-line"></div>
            <p className="scan-instruction">Наведите камеру на QR-код</p>
          </div> */}
        </div>
      </div>
      <div className="qr-scan-view">
        <p>Введите ID6 или отсканируйте QR-Code</p>
        <div className="input-with-button">
          <input type="text" pattern="[0-9A-Fa-f]" placeholder="Введите ID6 " className="input-field" />
          <button onClick={() => setScannedData("текст")} type="submit" className="submit-button">
            Отправить
          </button>
        </div>

        <button onClick={isScanning ? stopScanning : startScanning} className="qr-scan-button">
          <div className="qr-icon">&#x1F4F7;</div>
          <div className="qr-text">{isScanning ? "Отмена" : "Сканировать QR-код"}</div>
        </button>
      </div>
    </header>
  );
};

export default AuthPage;
