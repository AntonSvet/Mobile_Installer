export interface INonLinearSlider {
  text: string;
  valueStore: number;
  sliderProps: { unit: string; min: number; step: number; max: number };
  id: string;
  handleSettingsChange: (id: string, value: string | number) => void;
  isDisabled?: boolean;
}
