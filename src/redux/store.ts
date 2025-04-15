import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createAPI } from "./http/http";
import { AxiosInstance } from "axios";
import { devicesReducer } from "./reducers/devices/devicesReducer";

const persistConfig = {
  key: "root",
  storage,
};

export const createReduxStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
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
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createReduxStore();
export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore["dispatch"];
