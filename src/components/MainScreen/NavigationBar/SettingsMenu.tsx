import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";

 

import { useState } from "react";
import AboutAppModal from "./AboutAppModal";
import Download from "@mui/icons-material/DownloadTwoTone";
import Upload from "@mui/icons-material/UploadTwoTone";
 
import Display from "@mui/icons-material/DisplaySettingsTwoTone";
import LogoutIcon from "@mui/icons-material/LogoutTwoTone";
import ThemeButton from "../../../common/ThemeButton/ThemeButton";
import { IoMdSettings } from "react-icons/io";
export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAppModal, setOpenAppModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const callback = (x: boolean) => setOpenAppModal(x);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Настройки">
          <IconButton
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {IoMdSettings && (
              <IoMdSettings
                style={{ fontSize: "clamp(25px, 4vw, 24px)", margin: "0px", color: "var(--header-text-color)" }}
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              bgcolor: "var(--background-color-setting-menu)",
              color: "var(--text-color)",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "var(--background-color)",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Upload sx={{ paddingRight: "5px" }} fontSize="large" /> Сохранить конфигурацию
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Download sx={{ paddingRight: "5px" }} fontSize="large" /> Открыть конфигурацию
        </MenuItem>
        {/*  <Divider />
        <MenuItem onClick={handleClose}>
          <Restart sx={{ paddingRight: "5px" }} fontSize="large" /> Перезапуск
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={() => callback(true)}>
          <Display sx={{ paddingRight: "5px" }} fontSize="large" /> О программе
        </MenuItem>
        <Divider />
        <ThemeButton />
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon sx={{ paddingRight: "5px" }} fontSize="large" />
          </ListItemIcon>
          Выход
        </MenuItem>
      </Menu>
      {openAppModal && <AboutAppModal open={openAppModal} callback={() => callback(false)} />}
    </>
  );
}
