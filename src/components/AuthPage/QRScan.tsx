/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html5Qrcode, Html5QrcodeSupportedFormats, CameraDevice } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import FlashlightOffIcon from "@mui/icons-material/FlashlightOff";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
// Все поддерживаемые форматы
const supportedFormats = [
  Html5QrcodeSupportedFormats.QR_CODE,
  Html5QrcodeSupportedFormats.AZTEC,
  Html5QrcodeSupportedFormats.CODABAR,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.CODE_93,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.DATA_MATRIX,
  Html5QrcodeSupportedFormats.MAXICODE,
  Html5QrcodeSupportedFormats.ITF,
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.PDF_417,
  Html5QrcodeSupportedFormats.RSS_14,
  Html5QrcodeSupportedFormats.RSS_EXPANDED,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
];
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
  // Находим тыловую камеру
  const filterOptimalCameras = (devices: CameraDevice[]) => {
    // Приоритеты:
    // 1. Задняя камера без wide/ultra-wide в названии
    // 2. Первая задняя камера
    // 3. Первая доступная камера

    return devices.filter((device) => {
      const lowerLabel = device.label.toLowerCase();
      return (
        !lowerLabel.includes("front") &&
        !lowerLabel.includes("selfie") &&
        !lowerLabel.includes("wide") &&
        !lowerLabel.includes("ultra") &&
        (lowerLabel.includes("back") || lowerLabel.includes("rear") || lowerLabel.includes("environment"))
      );
    });
  };
  // Выбор оптимальной камеры по приоритетам
  const selectOptimalCamera = (devices: CameraDevice[]) => {
    const optimalCameras = filterOptimalCameras(devices);

    // Приоритеты выбора:
    // 1. Камеры с самым высоким разрешением
    // 2. Камеры с пометкой "main" или "default"
    // 3. Первая доступная тыловая камера

    // Сортируем по предполагаемому качеству (по наличию ключевых слов в названии)
    const sortedCameras = optimalCameras.sort((a, b) => {
      const aScore = getCameraPriorityScore(a.label);
      const bScore = getCameraPriorityScore(b.label);
      return bScore - aScore;
    });

    return sortedCameras[0]?.id || devices[0]?.id;
  };

  // Система оценки приоритета камеры
  const getCameraPriorityScore = (label: string) => {
    const lowerLabel = label.toLowerCase();
    let score = 0;

    if (lowerLabel.includes("main")) score += 3;
    if (lowerLabel.includes("default")) score += 2;
    if (lowerLabel.includes("primary")) score += 2;
    if (lowerLabel.includes("high")) score += 1;
    if (lowerLabel.includes("resolution")) score += 1;

    return score;
  };
  // Инициализация сканера
  const initScanner = async () => {
    try {
      // 1. Получаем список камер
      const devices = await Html5Qrcode.getCameras();
      if (!devices.length) throw new Error("Камеры не найдены");

      const optimalCameraId = selectOptimalCamera(devices);
      if (!optimalCameraId) throw new Error("Не найдена подходящая камера");
      if (devices && devices.length) {
        const optimalCameras = filterOptimalCameras(devices);

        setCameras(optimalCameras.length ? optimalCameras : devices);
        // rearCamera = filterOptimalCameras(devices);
        setSelectedCamera(optimalCameraId);
      } else {
        throw new Error("Камеры не найдены");
      }

      // 2. Создаем экземпляр сканера
      scannerRef.current = new Html5Qrcode(scannerContainerId, {
        formatsToSupport: supportedFormats,
        verbose: false,
      });

      // 3. Запускаем сканирование
      await startScan(optimalCameraId);
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
          facingMode: { ideal: "environment" },
        },
      };
      await scannerRef.current.start(
        cameraId,
        config,
        (decodedText) => {
          setQrResult(decodedText);
          stopScan();
        },
        () => {
          //console.warn(`QR ошибка: ${errorMessage}`);
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
      <h2>Наведите камеру на QR-код</h2>

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
            {/*  {torchEnabled ? " Выключить" : " Включить"} подсветку */}
          </button>
        )}

        {/* Зум */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <button onClick={() => handleZoomChange(zoomLevel - 0.5)} disabled={zoomLevel <= 1}>
            <ZoomOutIcon />
          </button>
          <span> {zoomLevel.toFixed(1)}x</span>
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
