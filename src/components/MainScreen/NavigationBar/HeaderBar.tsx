import "./headerBar.css";
import DrawerMenu from "./DrawerMenu";
import SettingsMenu from "./SettingsMenu";
import { FaRegSave } from "react-icons/fa";

const HeaderBar = ({ selectedMenu, callback, handleCloseModal }: { selectedMenu: string; callback: (el: string) => void; handleCloseModal: () => void }) => {
  console.log(selectedMenu)
  return (
    <div className="header-container">
      {selectedMenu === "SMS оповещение" || selectedMenu === "Коды пользователя" ?
        (<header className="header">
          <div className="drawer-menu">
            <DrawerMenu selectedMenu={selectedMenu} callback={callback} />
          </div>

          <div className="logo">{selectedMenu}</div>
          <div onClick={handleCloseModal} className="base-header-save">
            <FaRegSave className="base-header-icons" />
          </div>
        </header>)
        :
        (<header className="header">
          <div className="drawer-menu">
            <DrawerMenu selectedMenu={selectedMenu} callback={callback} />
          </div>
          <div className="logo">Юпитер-2084</div>
          <SettingsMenu />
        </header>)}
    </div>
  );
};

export default HeaderBar;
