import { AppDispatch } from "../../store";
import { snackbarActions } from "./snackbarReducer";

export const showErrorSnackbar =
  (text: string, time = 1500) =>
  (dispatch: AppDispatch) => {
    dispatch(
      snackbarActions.snackbarUpdate({
        text,
        severity: "error",
        time: time,
      })
    );
  };

export const showSuccessSnackbar =
  (text: string, time = 1500) =>
  (dispatch: AppDispatch) => {
    dispatch(
      snackbarActions.snackbarUpdate({
        text,
        severity: "success",
        time,
      })
    );
  };

export const showWarningSnackbar =
  (text: string, time = 1500) =>
  (dispatch: AppDispatch) => {
    dispatch(
      snackbarActions.snackbarUpdate({
        text,
        severity: "warning",
        time,
      })
    );
  };

export const showInfoSnackbar =
  (text: string, time = 1500) =>
  (dispatch: AppDispatch) => {
    dispatch(
      snackbarActions.snackbarUpdate({
        text,
        severity: "info",
        time,
      })
    );
  };
