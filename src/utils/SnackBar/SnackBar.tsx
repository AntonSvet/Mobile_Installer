import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { snackbarActions } from "../../redux/reducers/snackbar/snackbarReducer";
import "./snackbar.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const CustomizedSnackbars: React.FC = () => {
  const dispatch = useDispatch();
  const snackbar = useTypedSelector((state) => state.snackbar);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(snackbar.open || false);
  }, [snackbar.open]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsVisible(false);
    dispatch(
      snackbarActions.snackbarUpdate({
        ...snackbar,
        open: false,
      })
    );
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible && snackbar.time) {
      timer = setTimeout(() => {
        handleClose();
      }, snackbar.time);
    }
    return () => clearTimeout(timer);
  }, [isVisible, snackbar.time]);

  if (!isVisible) return null;

  const severityClass = snackbar.severity || "info";

  return (
    <div onClick={() => handleClose()} className={`snackbar-container top-right ${severityClass}`}>
      <div className="snackbar-content">
        <span className="snackbar-message">{snackbar.text}</span>
        {/*   <button className="snackbar-close">&times;</button> */}
      </div>
    </div>
  );
};

export default CustomizedSnackbars;
