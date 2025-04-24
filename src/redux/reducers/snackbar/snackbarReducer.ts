import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISnackbar } from "./snackbar.types";

export const initialState: ISnackbar = {
  open: false,
  time: 1500,
  text: "",
  severity: "success",
};

const snackbarSlice = createSlice({
  name: " snackbar",
  initialState,
  reducers: {
    snackbarUpdate(state, action: PayloadAction<ISnackbar>) {
      return { ...state, open: true, ...action.payload };
    },
  },
});

export const { actions: snackbarActions } = snackbarSlice;
export const { reducer: snackbarReducer } = snackbarSlice;
