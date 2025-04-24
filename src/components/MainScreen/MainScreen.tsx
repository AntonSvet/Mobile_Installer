import { useEffect, useState } from "react";
import HeaderBar from "./NavigationBar/HeaderBar";
import MainPage from "./Pages/MainPage";
import FooterDevice from "./Footer/FooterDevice";
import Footer from "./Footer/Footer";
import { showSuccessSnackbar } from "../../redux/reducers/snackbar/snackbarThunk";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";

const MainScreen = ({ scannedData }: { scannedData: string }) => {
  const dispatch = useTypedDispatch();
  const [selectedMenu, setSelectedMenu] = useState("Устройства");
  const handleMenu = (el: string) => setSelectedMenu(el);
  useEffect(() => {
    dispatch(showSuccessSnackbar(`Устройство на связи - ${scannedData}`));
  }, []);

  return (
    <div className="main_screen">
      <HeaderBar selectedMenu={selectedMenu} callback={handleMenu} handleCloseModal={() => {}} />
      <MainPage selectedMenu={selectedMenu} />
      {selectedMenu === "Устройства" ? <FooterDevice /> : <Footer />}
    </div>
  );
};

export default MainScreen;
