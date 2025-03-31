import "./headerBar.css";
import DrawerMenu from "./DrawerMenu";
import SettingsMenu from "./SettingsMenu";

const HeaderBar = ({ selectedMenu, callback }: { selectedMenu: string; callback: (el: string) => void }) => {
  return (
    <div className="header-container">
      <header className="header">
        <div className="drawer-menu">
          <DrawerMenu selectedMenu={selectedMenu} callback={callback} />
        </div>
        <div className="logo">
          Юпитер-2084
        </div>
        <SettingsMenu />
      </header>
    </div>
  );
};

export default HeaderBar;
