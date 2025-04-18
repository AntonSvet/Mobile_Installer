/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html5Qrcode, Html5QrcodeSupportedFormats, CameraDevice } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

import { MdFlashlightOn } from "react-icons/md";
import { MdFlashlightOff } from "react-icons/md";
import { PiCameraRotateFill } from "react-icons/pi";
import { devicesActions } from "../../redux/reducers/devices/devicesReducer";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { LuZoomIn } from "react-icons/lu";
import { LuZoomOut } from "react-icons/lu";

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
const Html5QrCodeScanner: React.FC<{ callback: (data: string) => void }> = ({ callback }) => {
  const dispatch = useTypedDispatch();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const phoneCamera = useTypedSelector((state) => state.devices.phoneCamera);
  const fileInputRef = useRef<HTMLSelectElement>(null);

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
    if (phoneCamera) {
      return phoneCamera;
    }
    if (sortedCameras.length >= 2) {
      dispatch(
        devicesActions.setPhoneCamera(
          sortedCameras[sortedCameras.length - 1]?.id || sortedCameras[0]?.id || devices[0]?.id
        )
      );
      return sortedCameras[sortedCameras.length - 1]?.id || sortedCameras[0]?.id || devices[0]?.id;
    }
    dispatch(devicesActions.setPhoneCamera(sortedCameras[0]?.id || devices[0]?.id));
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
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
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
          callback(decodedText);
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
    dispatch(devicesActions.setPhoneCamera(deviceId));
    await startScan(deviceId);
  };

  // Перезапуск сканирования
  const restartScan = async () => {
    await stopScan();
    callback("");
    setError("");
    await startScan(selectedCamera);
  };

  useEffect(() => {
    initScanner();

    return () => {
      stopScan();
    };
  }, []);
  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div style={{ minWidth: "300px", maxWidth: "600px", maxHeight: "500px", margin: "0 auto" }}>
      {/* <h2 style={{ margin: "0px", color: "#f8f5f5" }}>Наведите камеру на QR-код</h2>
       */}
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
      <span
        style={{
          display: "inline-block",
          position: "absolute",
          right: "5.5em",
          top: "3.5em",
          zIndex: 1000,
          color: "white",
        }}
      >
        Наведите камеру на QR-код
      </span>

      {/* Выбор камеры */}
      <div
        style={{
          display: "inline-block",
          position: "absolute",
          right: "35px",
          bottom: "2.5em",
          zIndex: 1000,
          height: "50px",
        }}
      >
        <select
          ref={fileInputRef}
          value={selectedCamera}
          onChange={(e) => handleCameraChange(e.target.value)}
          disabled={cameras.length === 0}
          style={{
            position: "absolute",
            opacity: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        >
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
            </option>
          ))}
        </select>
        <div
          onClick={handleCameraClick}
          style={{
            cursor: "pointer",
            padding: "8px",
            display: "inline-block",
            fontSize: "24px",
          }}
        >
          <PiCameraRotateFill size="40px" color="white" />
        </div>
      </div>

      {/* Подсветка */}
      {torchSupported && (
        <div
          style={{
            position: "absolute",
            bottom: "2.5em",
            left: "35px",
            zIndex: 1000,
            height: "45px",
          }}
        >
          {!torchEnabled ? (
            <MdFlashlightOff size="40px" color="white" onClick={toggleTorch} />
          ) : (
            <MdFlashlightOn size="40px" color="white" onClick={toggleTorch} />
          )}
        </div>
      )}

      {/*  {torchEnabled ? " Выключить" : " Включить"} подсветку */}

      {/* Зум */}
      <div
        style={{
          display: "flex",

          alignItems: "center",
          gap: "20px",
          position: "absolute",
          right: "35%",
          bottom: "2.5em",
          zIndex: 1000,
        }}
      >
        <LuZoomIn size="40px" color="white" onClick={() => handleZoomChange(zoomLevel + 0.5)} />

        <span style={{ color: "white" }}> {zoomLevel.toFixed(1)}x</span>
        <LuZoomOut size="40px" color="white" onClick={() => handleZoomChange(zoomLevel - 0.5)} />
      </div>

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
