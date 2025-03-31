import device2084 from "../../../../img/device/s_fonom_2084.png";
import { useEffect, useRef, useState } from "react";
import NavigationButtons from "./NavigationButtons/NavigationButtons";
// import Battery20SharpIcon from "@mui/icons-material/Battery20Sharp";
// import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import FloatingButton from "./FloatingButton/FloatingButton";
import ImageLoader from "../../../../common/ImageLoader/ImageLoader";
import useImageLoader from "../../../../hooks/useImageLoader";
import useResizeObserver from "../../../../hooks/useResizeObserver";
import CardDevice from "./CardDevice/CardDevice";
import RScardDevice from "./CardDevice/RScardDevice";
import FullScreenSettingDevice from "../../../../utils/FullScreenDialog/FullScreenSettingDevice";
import { dialogTitlesDevice } from "../../../../const/const";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../../../hooks/useTypedDispatch";
import { devicesActions } from "../../../../redux/reducers/devices/devicesReducer";
import { IRadioDevices } from "../../../../redux/reducers/devices/devices.types";
import "./monitoringPage.css";
import { GiBattery50 } from "react-icons/gi";
import { FaSignal } from "react-icons/fa6";
const MonitoringPage = () => {
  const devicesStore = useTypedSelector((state) => state.devices);
  const addedDevice = useTypedSelector((state) => state.devices.addedDevice);
  const [openModalSetting, setOpenModalSetting] = useState({ open: false, name: "", currentDevice: {} as IRadioDevices });
  const [isModalNewDevice, setIsModalNewDevice] = useState(false);
  const dispatch = useTypedDispatch();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useResizeObserver(headerRef);
  const { progress, isLoading } = useImageLoader(document.querySelectorAll("img"));
  useEffect(() => {
    if (addedDevice !== null) {
      const currentDevice = [...devicesStore.radio, ...devicesStore.rs485].find((el) => addedDevice.id === el.id);
      setOpenModalSetting({ open: true, name: addedDevice.name, currentDevice: currentDevice as IRadioDevices });

      dispatch(devicesActions.resetDevice());
    }
  }, [addedDevice, devicesStore.radio, devicesStore.rs485, dispatch]);

  return (
    <>
      {isLoading && (
        <div>
          <ImageLoader progress={progress} title={"Загрузка"} />;
        </div>
      )}
      <div className="container"
        ref={headerRef}
        style={{
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        <div className="device-grid-container">
          <div className="device-grid-container-device-info">
            <div><span>Sim 1</span> </div>
            <div>
              <FaSignal className="icons" />
            </div>
            <div>
              <GiBattery50 className="icons" />
            </div>
          </div>
          <div className="device-grid-container-device-image">
            <img width={"40%"} src={device2084} alt="logo" />
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "var( --text-color)" }}>Провод. Зона 1, рзд. 1</span>
                <div
                  style={{
                    width: "clamp(14px,3vw,18px)",
                    height: "clamp(14px,3vw,18px)",
                    background: "green",
                    borderRadius: "20px",
                    marginLeft: "10px",
                  }}
                ></div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "var( --text-color)" }}>Провод. Зона 2, рзд. 1</span>
                <div
                  style={{
                    width: "clamp(14px,3vw,18px)",
                    height: "clamp(14px,3vw,18px)",
                    background: "red",
                    borderRadius: "20px",
                    marginLeft: "10px",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginLeft: "9px" }}>
            <span>ID: 0000-0099-6CAC</span>
          </div>
        </div>

        <NavigationButtons />

        <div className="form-control">
          <select className="native-select" name="Фильтры">
            <option value="10">Фильтры</option>
            <option value="20">Все устройства</option>
            <option value="30">Устр. содерж. Зоны</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "85px",
          marginTop: `${headerHeight + 10}px`,
          visibility: isLoading ? "hidden" : "visible",
          minWidth: "260px",
          maxWidth: "500px",
          width: "100%",
          marginLeft: "6px",
          marginRight: "6px",
        }}
      >
        {[...devicesStore.radio, ...devicesStore.rs485].map((el, index) => {
          return el.type ? (
            <RScardDevice
              openSettingModal={() => setOpenModalSetting({ open: true, name: el.name, currentDevice: el })}
              key={index}
              el={el}
              index={index}
            />
          ) : (
            <CardDevice
              openSettingModal={() => setOpenModalSetting({ open: true, name: el.name, currentDevice: el })}
              key={index}
              el={el}
              index={index}
            />
          );
        })}

        <FloatingButton
          openNewDevice={() => {
            setIsModalNewDevice(true);
          }}
        />
      </div>
      {openModalSetting.open && (
        <FullScreenSettingDevice
          open={openModalSetting.open}
          handleClose={() => setOpenModalSetting({ open: false, name: "", currentDevice: {} as IRadioDevices })}
          title={openModalSetting.name}
          currentDevice={openModalSetting.currentDevice}
        />
      )}{" "}
      {isModalNewDevice && (
        <FullScreenSettingDevice
          open={isModalNewDevice}
          handleClose={() => setIsModalNewDevice(false)}
          title={dialogTitlesDevice.NEW_DEVICE}
          currentDevice={openModalSetting.currentDevice}
        />
      )}
    </>
  );
};

export default MonitoringPage;
