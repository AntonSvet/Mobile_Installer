/* import { useState } from "react";

import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
const QRScanner = () => {
  const [data, setData] = useState("");
  const [_error, _setError] = useState<IDetectedBarcode[] | null>(null);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Сканирование QR-кода</h2>
      <Scanner onScan={(result) => setData(result[0]?.rawValue || "")} />;
      {data && (
        <div style={{ marginTop: "20px" }}>
          <p>
            Результат: <strong>{data}</strong>
          </p>
          <button onClick={() => setData("")}>Очистить</button>
        </div>
      )}
    </div>
  );
};

export default QRScanner; */
import { FlashlightOff, FlashlightOn } from "@mui/icons-material";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useRef, useState } from "react";

const QrScannerWithCameraSelect = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [qrResult, setQrResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [torchEnabled, setTorchEnabled] = useState(false);

  // Инициализация и получение списка камер
  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const getCameras = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        setDevices(videoInputDevices);

        if (videoInputDevices.length > 1) {
          setSelectedDeviceId(videoInputDevices[videoInputDevices.length - 1].deviceId);
        } else if (videoInputDevices.length === 1) {
          setSelectedDeviceId(videoInputDevices[0].deviceId);
        }
      } catch (err) {
        setError("Не удалось получить доступ к камерам");
        console.error(err);
      }
    };

    getCameras();

    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  // Запуск сканера при изменении выбранной камеры
  useEffect(() => {
    if (!selectedDeviceId || !videoRef.current) return;

    const codeReader = new BrowserMultiFormatReader();
    setError("");

    codeReader
      .decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
        if (result) {
          setQrResult(result.getText());
        }

        if (err && !(err instanceof Error && err.message.includes("NotFoundError"))) {
          setError(err.message);
        }
      })
      .then((controls) => {
        controlsRef.current = controls;
      })
      .catch((err) => {
        setError(err.message);
      });

    return () => {
      controlsRef.current?.stop();
    };
  }, [selectedDeviceId]);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(event.target.value);
    setQrResult(""); // Сбрасываем предыдущий результат
  };
  const toggleTorch = async () => {
    if (!selectedDeviceId || !videoRef.current?.srcObject) return;

    const stream = videoRef.current.srcObject as MediaStream;
    const track = stream.getVideoTracks()[0];

    try {
      await track.applyConstraints({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        advanced: [{ torch: !torchEnabled } as any],
      });
      setTorchEnabled(!torchEnabled);
    } catch (err) {
      setError("Подсветка не поддерживается");
      console.error("Ошибка переключения подсветки:", err);
    }
  };
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Наведите камеру на QR-код</h2>

      {/* Выбор камеры */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="camera-select">Выберите камеру: </label>
        <select
          id="camera-select"
          value={selectedDeviceId}
          onChange={handleDeviceChange}
          disabled={devices.length === 0}
        >
          {devices.map((device, index) => (
            <option
              key={device.deviceId}
              value={device.deviceId}
              style={{
                fontWeight: index === devices.length - 1 ? "bold" : "normal",
              }}
            >
              {device.label || `Камера ${device.deviceId.slice(0, 5)}`}
              {index === devices.length - 1 && " (по умолчанию)"}
            </option>
          ))}
        </select>
        <button
          onClick={toggleTorch}
          style={{
            padding: "8px 12px",
            background: torchEnabled ? "#ffeb3b" : "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {torchEnabled ? <FlashlightOn /> : <FlashlightOff />}
        </button>
      </div>

      {/* Видео поток */}
      <video
        ref={videoRef}
        style={{
          width: "100%",
          border: "2px solid #333",
          borderRadius: "8px",
        }}
      />

      {/* Результат сканирования */}
      {qrResult && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
          <p>
            Результат: <strong>{qrResult}</strong>
            Камера: <strong>{selectedDeviceId}</strong>
          </p>
        </div>
      )}

      {/* Ошибки */}
      {error && <div style={{ color: "red", marginTop: "20px" }}>Ошибка: {error}</div>}

      {/* Подсказка если камеры не найдены */}
      {devices.length === 0 && !error && <p>Загрузка списка камер...</p>}
    </div>
  );
};

export default QrScannerWithCameraSelect;
