import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";

import { ICustomizedSwitches } from "./customizedSwitches.types";
import { Android12Switch } from "./customizedSwitches.style";
import { useIsMounted } from "../../hooks/useIsMounted";

export default function CustomizedSwitches({ option, handleSettingsChange, id }: ICustomizedSwitches) {
  const [checked, setCheck] = useState<boolean>(option);
  const isMounted = useIsMounted();
  function switchBox() {
    setCheck((prev) => !prev);
  }

  useEffect(() => {
    isMounted && handleSettingsChange(id, id !== "disabled" ? checked : !checked);
  }, [checked]);

  return (
    <FormGroup>
      <FormControlLabel
        sx={{ margin: 0 }}
        checked={checked}
        control={<Android12Switch />}
        label=""
        onChange={switchBox}
      />
    </FormGroup>
  );
}
