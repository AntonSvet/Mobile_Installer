import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createAPI } from "./http/http";
import { AxiosInstance } from "axios";
import { devicesReducer } from "./reducers/devices/devicesReducer";

export const createReduxStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
        serializableCheck: false,
      }),
  });
};
export interface ThunkExtraArg {
  api: AxiosInstance;
}
export interface ThunkConfig {
  extra: ThunkExtraArg;
  dispatch: AppDispatch;
  state: RootState;
}

export const $api = createAPI();
const extraArg: ThunkExtraArg = {
  api: $api,
};
const rootReducer = combineReducers({
  devices: devicesReducer,
});
const store = createReduxStore();
export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore["dispatch"];
