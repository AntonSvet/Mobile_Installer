export interface ICustomizedSwitches {
  option: boolean;
  id: string;
  handleSettingsChange: (id: string, value: boolean) => void;
}
