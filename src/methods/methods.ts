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
