import { useState } from "react";

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

export default QRScanner;
