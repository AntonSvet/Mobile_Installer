import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { IRadioDevices } from "../../redux/reducers/devices/devices.types";
import { devicesActions } from "../../redux/reducers/devices/devicesReducer";
import "./deletefooter.css";

interface DeleteFooterProps {
  currentDevice: IRadioDevices;
  handleCloseModal: () => void;
}
const DeleteFooter = ({ currentDevice, handleCloseModal }: DeleteFooterProps) => {
  const dispatch = useTypedDispatch();
  function deleteDevice() {
    dispatch(devicesActions.removeRadioDevice(currentDevice.id));
    handleCloseModal();
  }
  return (
    <footer >
      <button className="delete-footer">
        <span onClick={deleteDevice}>Удалить устройство</span>
      </button>
    </footer>
  )
}
export default DeleteFooter;
