import { IDevices, IRadioDevices, Irs485Devices } from "../redux/reducers/devices/devices.types";

export function valueLabelFormat(value: number) {
  let scaledValue = value;
  while (scaledValue >= 24 && scaledValue <= 1) {
    scaledValue += 1;
  }
  return `${scaledValue}`;
}
//Формат ползунка NonLinearSlider
export function dailyClearingLabelFormat(value: number) {
  const scaledValue = +valueLabelFormat(value);
  return `${scaledValue < 10 ? "0" : ""}${scaledValue}:00`;
}
export function changeSelectType(
  selectedButton: string,
  devicesStore: IDevices,
  callback: (devices: (IRadioDevices | Irs485Devices)[]) => void
) {
  switch (selectedButton) {
    case "Все":
      callback([...devicesStore.radio, ...devicesStore.rs485]);
      break;
    case "Радиоканал":
      callback(devicesStore.radio);
      break;
    case "RS-485":
      callback(devicesStore.rs485);
      break;
    default:
      break;
  }
}
function withoutComma(str: string) {
  return str[str.length - 1] === "," ? str.slice(0, -1) : str;
}
export function sortedSection(str: string[]) {
  if (!str) return "";
  const arr = str.map((el) => Number(el)).sort((a, b) => a - b);
  let result = "";
  let firstEL = "";
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (el - 1 === arr[i - 1]) {
      count++;
      if (i === arr.length - 1) {
        if (count !== 1) {
          result += firstEL + "-" + arr[i];
        } else {
          result += firstEL + "," + arr[i];
        }
        return result.length > 23 ? withoutComma(result.slice(0, 21)) + "..." : result;
      }
    } else {
      if (firstEL) {
        if (+firstEL !== arr[i - 1]) {
          if (count !== 1) {
            result += firstEL + "-" + arr[i - 1] + ",";
          } else {
            result += firstEL + "," + arr[i - 1] + ",";
          }
          count = 0;
        } else {
          count = 0;
          result += firstEL.toString() + ",";
        }
        firstEL = el.toString();
      } else {
        firstEL = el.toString();
      }
    }
  }
  const sortStr = result + firstEL;
  const tmp = sortStr.length > 23 ? sortStr.slice(0, 21) + "..." : sortStr;
  return tmp;
}
