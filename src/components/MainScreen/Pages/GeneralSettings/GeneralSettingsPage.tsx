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

const GeneralSettingsPage = () => {
  const [isSuccess, setSuccess] = useState("1");
  const handleSuccessChange = (event: SelectChangeEvent) => {
    const item = event.target.value;
    setSuccess(item);
  };
  return (
    <div className="setting-device-card">
      <Paper className="setting-device-card-paper" elevation={24}>
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
      </Paper>
      <Paper className="setting-device-card-paper" elevation={24}>
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
    </div>
  );
};

export default GeneralSettingsPage;
