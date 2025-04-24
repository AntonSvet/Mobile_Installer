import { useState } from "react";
import HeaderBar from "./NavigationBar/HeaderBar";
import MainPage from "./Pages/MainPage";
import FooterDevice from "./Footer/FooterDevice";
import Footer from "./Footer/Footer";

const MainScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState("Устройства");
  const handleMenu = (el: string) => setSelectedMenu(el);

  return (
    <div className="main_screen">
      <HeaderBar selectedMenu={selectedMenu} callback={handleMenu} handleCloseModal={() => { }} />
      <MainPage selectedMenu={selectedMenu} />
      {selectedMenu === "Устройства" ? <FooterDevice /> : <Footer />}
    </div>
  );
};

export default MainScreen;
