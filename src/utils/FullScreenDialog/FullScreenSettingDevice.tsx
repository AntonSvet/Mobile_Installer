import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";

import { Transition } from "./fullScreenDialog.style";
import { dialogTitlesDevice, dialogTitlesParametrs } from "../../const/const";
import SettingRSCard from "../../components/MainScreen/Pages/Monitoring/CardDevice/SettingCard/SettingRSCard";

import AddNewDevice from "../../components/MainScreen/Pages/Monitoring/AddNewDevices/AddNewDevices";
import RadioCard from "../../components/MainScreen/Pages/Monitoring/CardDevice/RadioCard/RadioCard";
import { IRadioDevices } from "../../redux/reducers/devices/devices.types";

import Parameters from "../../components/MainScreen/Pages/Connection/Parameters";
import EthernetTab from "../../components/MainScreen/Pages/Connection/LAN-GPRS/EthernetTab/EthernetTab";
import GPRS from "../../components/MainScreen/Pages/Connection/LAN-GPRS/GPRS/GPRS";
import MainDevice from "../../components/MainScreen/Pages/Monitoring/MainDevice/MainDevice";

interface FullScreenSettingDeviceProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  currentDevice?: IRadioDevices;
}

export default function FullScreenSettingDevice({
  open,
  handleClose,
  title,
  currentDevice,
}: FullScreenSettingDeviceProps) {
  const handleCloseModal = () => {
    handleClose?.();
  };

  const DialogRoute = ({ route }: { route: string }) => {
    switch (route) {
      case dialogTitlesDevice.EXPANDER_3812:
        return currentDevice && <SettingRSCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.EXPANDER_3811:
        return currentDevice && <SettingRSCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.RADIO_5830:
        return currentDevice && <RadioCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.RADIO_5130:
        return currentDevice && <RadioCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.RADIO_5230:
        return currentDevice && <RadioCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.DEVICE_2084:
        return <MainDevice handleCloseModal={handleCloseModal} />;
      case dialogTitlesDevice.NEW_DEVICE:
        return <AddNewDevice handleCloseModal={handleCloseModal} />;
      case dialogTitlesParametrs.LAN:
        return <EthernetTab title={route} handleCloseModal={handleCloseModal} />;
      case dialogTitlesParametrs.GPRS:
        return <GPRS title={route} handleCloseModal={handleCloseModal} />;
      case "Параметры связи":
        return <Parameters title={route} handleCloseModal={handleCloseModal} />;

      default:
        return currentDevice && <SettingRSCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
    }
  };
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleCloseModal} TransitionComponent={Transition}>
        <List
          component="div"
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            background: "var(--background-color )",
            paddingTop: 0,
          }}
        >
          <DialogRoute route={title} />
        </List>
      </Dialog>
    </div>
  );
}
