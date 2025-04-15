import device2084 from "../../../../img/device/s_fonom_2084.png";
import { useEffect, useRef, useState } from "react";
import NavigationButtons from "./NavigationButtons/NavigationButtons";
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
import { changeSelectType } from "../../../../methods/methods";

const MonitoringPage = () => {
  const dispatch = useTypedDispatch();
  const devicesStore = useTypedSelector((state) => state.devices);
  const addedDevice = useTypedSelector((state) => state.devices.addedDevice);
  const armCondition = useTypedSelector((state) => state.devices.secured);
  const [selectedButton, setSelectedButton] = useState<string>("Все");

  const [filtredDevices, setFiltredDevices] = useState([...devicesStore.radio, ...devicesStore.rs485]);
  const [openModalSetting, setOpenModalSetting] = useState({
    open: false,
    name: "",
    currentDevice: {} as IRadioDevices,
  });
  const [isModalNewDevice, setIsModalNewDevice] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useResizeObserver(headerRef);
  const { progress, isLoading } = useImageLoader(document.querySelectorAll("img"));
  useEffect(() => {
    if (addedDevice !== null) {
      const currentDevice = [...devicesStore.radio, ...devicesStore.rs485].find((el) => addedDevice.id === el.id);
      setOpenModalSetting({ open: true, name: addedDevice.name, currentDevice: currentDevice as IRadioDevices });

      dispatch(devicesActions.resetDevice());
    }
    changeSelectType(selectedButton, devicesStore, setFiltredDevices);
  }, [addedDevice, devicesStore.radio, devicesStore.rs485, dispatch, devicesStore]);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    changeSelectType(buttonName, devicesStore, setFiltredDevices);
  };

  return (
    <>
      {isLoading && (
        <div>
          <ImageLoader progress={progress} title={"Загрузка"} />;
        </div>
      )}
      <div
        className="container"
        ref={headerRef}
        style={{
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        <div className="device-container">
          <div className="device-status-bar" style={{ backgroundColor: "white" }}></div>
          <div className="device-block">
            <div className="device-block-info">
              <div>
                <span>SIM 1</span>
              </div>
              <div className="signal-icon">
                <FaSignal />
              </div>
              <div className="battery-icon">
                <GiBattery50 />
              </div>
            </div>
            <div
              onClick={() => setOpenModalSetting({ open: true, name: "Ю-2084", currentDevice: {} as IRadioDevices })}
              className="device-block-image"
            >
              <img width={"40%"} src={device2084} alt="logo" />
              <div className="device-block-zones-block">
                <div className="device-block-zones">
                  <div>
                    <span style={{ color: "var( --text-color)" }}>Зона 1, рзд. 1</span>
                  </div>
                  <div className="device-block-zones-indicators" style={{ background: armCondition }}></div>
                </div>
                <div className="device-block-zones">
                  <span style={{ color: "var( --text-color)" }}>Зона 2, рзд. 1</span>
                  <div className="device-block-zones-indicators" style={{ background: armCondition }}></div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", marginLeft: "9px" }}>
              <span>ID: 0000-0099-6CAC</span>
            </div>
          </div>
        </div>

        <NavigationButtons selectedButton={selectedButton} handleButtonClick={handleButtonClick} />

        <div className="form-control">
          <select className="native-select" name="Фильтры">
            <option value="10">Фильтры</option>
            <option value="20">Устройства содержащие зоны</option>
            <option value="30">Устройства содержащие выходы</option>
            <option value="30">Устройства взятия/снятия</option>
            <option value="30">Ретрансляторы</option>
          </select>
        </div>
      </div>
      <div
        className="sensors-list-container"
        style={{
          marginTop: `${headerHeight + 10}px`,
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        {filtredDevices.map((el, index) => {
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
      )}
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
