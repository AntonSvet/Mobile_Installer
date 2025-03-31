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
