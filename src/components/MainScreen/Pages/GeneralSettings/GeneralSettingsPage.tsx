import { Box, Divider, FormControl, Grid, ListItem, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { VolumeUp } from "@mui/icons-material";
import { useState } from "react";
import "./generalSettings.css";
import CustomSlider from "../../../../common/CustomSlider/CustomSlider";

const GeneralSettingsPage = () => {
  const [isSuccess, setSuccess] = useState("1");
  const handleSuccessChange = (event: SelectChangeEvent) => {
    const item = event.target.value;
    setSuccess(item);
  };
  return (
    <div className="setting-device-card">
      <div className="setting-device-card-paper">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span>Идентификатор</span>
              <span>устройства</span>
            </div>

            <span style={{ fontSize: "clamp(22px,5.5vw,26px)", fontWeight: "bold" }}>0000-0099-6CAC</span>
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
      </div>
      <div className="setting-device-card-paper">
        <span
          style={{
            paddingBottom: "0px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignContent: "flex-start", alignItems: "flex-start" }}>
            <span id="input-slider">
              <span>Громкость встроеного зумера</span>
            </span>
            <Grid container spacing={2} sx={{ alignItems: "center", width: "calc(100% + -52px)" }}>
              <Grid>
                <VolumeUp />
              </Grid>
              <Grid>
                <CustomSlider defaultValue={3} min={0} max={4} />
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
                  <span>Светодиодная инд. 30 сек.</span>
                </MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <Divider />
        </span>
        <ListItem sx={{ padding: "0px" }}>
          <FormControl sx={{ minWidth: "100%" }} size="small">
            <Select value={isSuccess} onChange={handleSuccessChange}>
              <MenuItem value={1}>
                <span>GSM-антенна встроенная</span>
              </MenuItem>
              <MenuItem value={2}>
                <span>GSM-антенна внешняя</span>
              </MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </div>
    </div>
  );
};

export default GeneralSettingsPage;
