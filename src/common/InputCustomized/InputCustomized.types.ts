import { JSX } from "react";

export interface IKeyboard {
  label: string;
  id: string;
  value: string | null;
  flag?: string;
  type?: string;
  storeID?: string;
  numeric?: boolean;
  userHeader?: boolean;
  isDisabled?: boolean;
  handleSettingsChange?: (id: string, value: string | null) => void;
  inputProps?: JSX.Element;
  scrollView?: string;
}
