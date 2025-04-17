import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDevices, IRadioDevices, Irs485Devices } from "./devices.types";

export const initialState: IDevices = {
  radio: [],
  rs485: [],
  addedDevice: null,
  secured: "grey",
  phoneCamera: "",
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    getCamerasStatuses(state, action: PayloadAction<IDevices>) {
      return { ...state, ...action.payload };
    },
    addRadioDevice(state, action: PayloadAction<IRadioDevices>) {
      return { ...state, radio: [...state.radio, action.payload], addedDevice: action.payload };
    },
    addRSDevice(state, action: PayloadAction<Irs485Devices>) {
      return { ...state, rs485: [...state.rs485, action.payload], addedDevice: action.payload };
    },
    removeRadioDevice(state, action: PayloadAction<number>) {
      return { ...state, radio: state.radio.filter((el) => el.id !== action.payload) };
    },
    removeRSDevice(state, action: PayloadAction<number>) {
      return { ...state, rs485: state.rs485.filter((el) => el.id !== action.payload) };
    },
    resetDevice(state) {
      return { ...state, addedDevice: null };
    },
    getArm(state) {
      return { ...state, secured: "green" };
    },
    getDisarm(state) {
      return { ...state, secured: "grey" };
    },
    setPhoneCamera(state, action: PayloadAction<string>) {
      return { ...state, phoneCamera: action.payload };
    },
  },
});

export const { actions: devicesActions } = devicesSlice;
export const { reducer: devicesReducer } = devicesSlice;
