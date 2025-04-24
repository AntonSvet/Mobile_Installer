export interface ISnackbar {
  open?: boolean;
  text: string;
  time?: number;
  severity: "success" | "info" | "warning" | "error";
}
