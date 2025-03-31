import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
 
import { Transition,   } from "./fullScreenDialog.style";
import { dialogTitlesDevice } from "../../const/const";
import SettingRSCard from "../../components/MainScreen/Pages/Monitoring/CardDevice/SettingCard/SettingRSCard";
import GeneralSettingsPage from "../../components/MainScreen/Pages/GeneralSettings/GeneralSettingsPage";
import AddNewDevice from "../../components/MainScreen/Pages/Monitoring/AddNewDevices/AddNewDevices";
import RadioCard from "../../components/MainScreen/Pages/Monitoring/CardDevice/RadioCard/RadioCard";
import { IRadioDevices } from "../../redux/reducers/devices/devices.types";

 
  
 
interface FullScreenSettingDeviceProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  currentDevice: IRadioDevices
}

export default function FullScreenSettingDevice({ open, handleClose, title, currentDevice }: FullScreenSettingDeviceProps) {
  const handleCloseModal = () => {
     handleClose?.();
  };
  const DialogRoute = ({ route }: { route: string }) => {
    switch (route) {
      case dialogTitlesDevice.EXPANDER_3812:
        return <SettingRSCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.EXPANDER_3811:
        return <SettingRSCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.RADIO_5830:
        return <RadioCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.RADIO_5130:
        return <RadioCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.RADIO_5230:
        return <RadioCard handleCloseModal={handleCloseModal} currentDevice={currentDevice} />;
      case dialogTitlesDevice.DEVICE_2084:
        return <GeneralSettingsPage  />;
      case dialogTitlesDevice.NEW_DEVICE:
        return <AddNewDevice handleCloseModal={handleCloseModal} />;
      default:
        return <SettingRSCard handleCloseModal={handleCloseModal} currentDevice={currentDevice}/>;
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
          }}
        >
          <DialogRoute route={title} />
        </List>
      </Dialog>
    </div>
  );
}
