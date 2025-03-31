import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import MenuIcon from "@mui/icons-material/Menu";

import { Tooltip } from "@mui/material";
function DrawerMenu({ selectedMenu, callback }: { selectedMenu: string; callback: (el: string) => void }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{

        height: "100vh",
        color: "var( --text-color)",
        width: "100%",
        background: "var(--background-drawer-menu)",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {["Общие", "Устройства", "Зоны", "Параметры связи", "Коды пользователя"].map((text, index) => (
          <div key={index}>
            <ListItem disablePadding>
              <ListItemButton style={{ background: text === selectedMenu ? "#babcc3" : "" }}>
                <span style={{ fontSize: "clamp(26px, 4vw, 30px)" }} onClick={() => callback(text)}>
                  {text}
                </span>
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <span
        style={{ color: "var(--header-text-color", fontSize: "clamp(25px, 4vw, 24px)" }}
        onClick={toggleDrawer(true)}
      >
        <Tooltip title="Меню">
          <MenuIcon sx={{ cursor: "pointer" }} fontSize="large" />
        </Tooltip>
      </span>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
export default DrawerMenu;