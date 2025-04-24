import "./footer.css";
import { MdLockOutline } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { RiLockStarLine } from "react-icons/ri";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { devicesActions } from "../../../redux/reducers/devices/devicesReducer";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { showSuccessSnackbar } from "../../../redux/reducers/snackbar/snackbarThunk";

const FooterDevice = () => {
  const dispatch = useTypedDispatch();
  const armCondition = useTypedSelector((state) => state.devices.secured);
  return (
    <footer className="footer-device">
      <div className="footer-device-buttons-block">
        <button onClick={() => dispatch(showSuccessSnackbar("Устройство на связи"))}>
          <RiLockStarLine className="footer-device-button-icon" />
        </button>
        <button
          onClick={() => {
            dispatch(devicesActions.getDisarm());
            dispatch(showSuccessSnackbar("Снят с охраны"));
          }}
        >
          <MdLockOpen className="footer-device-button-icon" />
        </button>
        <button
          onClick={() => {
            dispatch(devicesActions.getArm());
            dispatch(showSuccessSnackbar("Взят под охрану"));
          }}
        >
          <MdLockOutline style={{ color: armCondition }} className="footer-device-button-icon" />
        </button>
      </div>
    </footer>
  );
};

export default FooterDevice;
