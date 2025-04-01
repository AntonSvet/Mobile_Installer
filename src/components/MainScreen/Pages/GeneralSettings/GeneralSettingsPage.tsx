import {
  Box,
  Divider,
  FormControl,
  Grid,
  Input,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";

import { VolumeUp } from "@mui/icons-material";
import { useState } from "react";
import "./generalSettings.css";
const classes = {
  positionSettings: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "6px",
  },
  mainSettings: {
    maxWidth: 700,
    minWidth: 280,
    /*  width: "580px",
    height: "140px", */
    background: "var(--background-device-card)",
    width: "98%",
    marginTop: "6px",
    padding: "5px",
  },
  settingsTitle: {
    background: "#eee",
    borderRadius: "4px 4px 0 0",
    padding: "5px 0px",
    margin: "0px",
    lineHeight: "26px",

    fontSize: "1rem",
    zIndex: 2,
  },
  lockControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 37,
  },
};

const GeneralSettingsPage = () => {
  const [isSuccess, setSuccess] = useState("1");
  const handleSuccessChange = (event: SelectChangeEvent) => {
    const item = event.target.value;
    setSuccess(item);
  };
  return (
    <div className="setting-device-card">
      <Paper style={classes.mainSettings} elevation={24}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span>Идентификатор</span>
              <span>устройства</span>
            </div>

            <span style={{ fontSize: "25px", fontWeight: "bold" }}>0000-0099-6CAC</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "12px 0px" }}>
            <div>
              <span style={{ whiteSpace: "nowrap" }}>Пароль для конфигурации</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <input style={{ width: "80%" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
            <div>
              <span style={{ whiteSpace: "nowrap" }}>Пароль удал. управления </span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <input style={{ width: "80%" }} />
            </div>
          </div>
        </div>
      </Paper>
      <Paper style={classes.mainSettings} elevation={24}>
        <List
          sx={{
            paddingBottom: "0px",
          }}
          component="span"
          aria-label="mailbox folders"
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignContent: "flex-start", alignItems: "flex-start" }}>
            <Typography id="input-slider" gutterBottom>
              <span>Громкость встроеного зумера</span>
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: "center", width: "calc(100% + -52px)" }}>
              <Grid>
                <VolumeUp />
              </Grid>
              <Grid>
                <Slider aria-labelledby="input-slider" />
              </Grid>
              <Grid>
                <Input
                  size="medium"
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 5,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <ListItem sx={{ padding: "0px" }}>
            <FormControl sx={{ minWidth: "100%" }} size="small">
              <Select value={isSuccess} onChange={handleSuccessChange}>
                <MenuItem value={1}>
                  <span>Светодиодная инд. вкл. всегда</span>
                </MenuItem>
                <MenuItem value={2}>
                  {" "}
                  <span>Светодиодная инд. 30 сек.</span>
                </MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <Divider />
        </List>
      </Paper>
      {/*  <Paper style={classes.mainSettings} elevation={24}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px" }}>
            <div style={{ display: "flex" }}>
              <span>Ethernet/Wi-Fi</span>
            </div>
            <div>
              <span>{"Вкл. >"}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px" }}>
            <div>
              <span>GPRS Sim 1</span>
            </div>
            <div>
              <span>{"Выкл. >"}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px" }}>
            <div>
              <span>GPRS Sim 2</span>
            </div>
            <div>
              <span>{"Выкл. >"}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px" }}>
            <div>
              <span>SMS</span>
            </div>
            <div>
              <span>{"Вкл. >"}</span>
            </div>
          </div>
        </div>
      </Paper> */}
    </div>
  );
};

export default GeneralSettingsPage;
