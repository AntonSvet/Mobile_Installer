import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { dailyClearingLabelFormat, valueLabelFormat } from "../../methods/methods";
import { INonLinearSlider } from "./nonLinearSlider.types";
import { useIsMounted } from "../../hooks/useIsMounted";
import { useEffect, useState } from "react";

export default function NonLinearSlider({
  text,
  sliderProps,
  id,
  handleSettingsChange,
  valueStore,
  isDisabled,
}: INonLinearSlider) {
  const [value, setValue] = useState<number>(valueStore);

  const { unit, min, step, max } = sliderProps;
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted) {
      setValue(valueStore);
    }
  }, [valueStore]);
  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  function onChangeCommitted() {
    if (handleSettingsChange) {
      handleSettingsChange(id, value);
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <Box>
        <Slider
          disabled={isDisabled}
          value={value}
          min={min}
          step={step}
          max={max}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          onChange={handleChange}
          onChangeCommitted={onChangeCommitted}
          valueLabelDisplay="auto"
          sx={{ zIndex: 1 }}
        />
        <Typography id="non-linear-slider" gutterBottom>
          {text}: {max !== 23 ? valueLabelFormat(value) : dailyClearingLabelFormat(value)}
          {unit}
        </Typography>
      </Box>
    </div>
  );
}
