/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html5Qrcode, Html5QrcodeSupportedFormats, CameraDevice } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import FlashlightOffIcon from "@mui/icons-material/FlashlightOff";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
const Html5QrCodeScanner = () => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [qrResult, setQrResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const scannerContainerId = "html5qr-code-scanner-container";

  // Инициализация сканера
  const initScanner = async () => {
    try {
      // 1. Получаем список камер
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        setCameras(devices);
        setSelectedCamera(devices[0].id);
      } else {
        throw new Error("Камеры не найдены");
      }

      // 2. Создаем экземпляр сканера
      scannerRef.current = new Html5Qrcode(scannerContainerId, {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: false,
      });

      // 3. Запускаем сканирование
      await startScan(devices[0].id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка инициализации сканера");
    }
  };

  // Запуск сканирования
  const startScan = async (cameraId: string) => {
    try {
      if (!scannerRef.current) return;
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        videoConstraints: {
          deviceId: { exact: cameraId },

          zoom: zoomLevel,
          focusMode: "continuous",
        },
      };
      await scannerRef.current.start(
        cameraId,
        config,
        (decodedText) => {
          setQrResult(decodedText);
          stopScan();
        },
        (errorMessage) => {
          console.warn(`QR ошибка: ${errorMessage}`);
        }
      );
      // Проверяем поддержку подсветки
      checkTorchSupport();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сканирования");
    }
  };
  // Проверка поддержки подсветки
  const checkTorchSupport = async () => {
    if (!scannerRef.current) return;

    try {
      const capabilities = await scannerRef.current.getRunningTrackCapabilities();
      setTorchSupported("torch" in capabilities);
    } catch (err) {
      console.error("Проверка подсветки не поддерживается:", err);
    }
  };

  // Переключение подсветки
  const toggleTorch = async () => {
    if (!scannerRef.current) return;

    try {
      await scannerRef.current.applyVideoConstraints({
        advanced: [{ torch: !torchEnabled } as any],
      });
      setTorchEnabled(!torchEnabled);
    } catch (err) {
      console.error("Ошибка фокусировки:", err);
    }
  };

  // Изменение зума
  const handleZoomChange = (newZoom: number) => {
    const clampedZoom = Math.max(1, Math.min(newZoom, 4));
    setZoomLevel(clampedZoom);

    if (scannerRef.current?.isScanning) {
      scannerRef.current.applyVideoConstraints({
        advanced: [{ zoom: clampedZoom } as any],
      });
    }
  };

  // Автофокус по клику
  const handleFocusClick = async () => {
    if (!scannerRef.current) return;

    try {
      await scannerRef.current.applyVideoConstraints({
        advanced: [{ focusMode: "auto" } as any],
      });

      // Визуальная индикация
      const container = document.getElementById(scannerContainerId);
      if (container) {
        container.style.boxShadow = "0 0 0 3px rgba(0, 255, 0, 0.5)";
        setTimeout(() => {
          if (container) container.style.boxShadow = "";
        }, 300);
      }
    } catch (err) {
      console.error("Ошибка фокусировки:", err);
    }
  };

  // Остановка сканирования
  const stopScan = async () => {
    try {
      if (scannerRef.current && scannerRef.current.isScanning) {
        await scannerRef.current.stop();
      }
    } catch (err) {
      console.error("Ошибка остановки:", err);
    }
  };

  // Смена камеры
  const handleCameraChange = async (deviceId: string) => {
    await stopScan();
    setSelectedCamera(deviceId);
    await startScan(deviceId);
  };

  // Перезапуск сканирования
  const restartScan = async () => {
    await stopScan();
    setQrResult("");
    setError("");
    await startScan(selectedCamera);
  };

  useEffect(() => {
    initScanner();

    return () => {
      stopScan();
    };
  }, []);
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Advanced QR Scanner</h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {/* Выбор камеры */}
        <select
          value={selectedCamera}
          onChange={(e) => handleCameraChange(e.target.value)}
          disabled={cameras.length === 0}
        >
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
            </option>
          ))}
        </select>

        {/* Подсветка */}
        {torchSupported && (
          <button onClick={toggleTorch} style={{ padding: "8px 12px" }}>
            {torchEnabled ? <FlashlightOffIcon /> : <FlashlightOnIcon />}
            {torchEnabled ? " Выключить" : " Включить"} подсветку
          </button>
        )}

        {/* Зум */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <button onClick={() => handleZoomChange(zoomLevel - 0.5)} disabled={zoomLevel <= 1}>
            <ZoomOutIcon />
          </button>
          <span>Zoom: {zoomLevel.toFixed(1)}x</span>
          <button onClick={() => handleZoomChange(zoomLevel + 0.5)} disabled={zoomLevel >= 4}>
            <ZoomInIcon />
          </button>
        </div>
      </div>

      {/* Контейнер сканера */}
      <div
        id={scannerContainerId}
        onClick={handleFocusClick}
        style={{
          width: "100%",
          height: "400px",
          border: "2px solid #333",
          borderRadius: "8px",
          overflow: "hidden",
          cursor: "pointer",
        }}
      />

      {/* Результат */}
      {qrResult && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#f0f0f0", borderRadius: "4px" }}>
          <h3>Результат:</h3>
          <p style={{ wordBreak: "break-all" }}>{qrResult}</p>
          <button onClick={restartScan} style={{ marginTop: "10px" }}>
            Сканировать еще
          </button>
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <p>{error}</p>
          <button onClick={restartScan}>Повторить</button>
        </div>
      )}
    </div>
  );
};

export default Html5QrCodeScanner;
