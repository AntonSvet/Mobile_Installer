import { useState } from "react";
import Footer from "./Footer/Footer";
import HeaderBar from "./NavigationBar/HeaderBar";
import MainPage from "./Pages/MainPage";

const MainScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState("Мониторинг");
  const handleMenu = (el: string) => setSelectedMenu(el);

  return (
    <div className="main_screen">
      <HeaderBar selectedMenu={selectedMenu} callback={handleMenu} />
      <MainPage selectedMenu={selectedMenu} />
      <Footer />
    </div>
  );
};

export default MainScreen;
