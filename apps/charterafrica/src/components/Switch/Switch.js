import { styled, Switch as MuiSwitch } from "@mui/material";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const SwitchRoot = styled((props) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))({
  width: 75,
  height: 30,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 5,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      // total width - (thumb width + margin left + margin right)
      transform: "translateX(45px)",
      color: neutral[900],
      "& + .MuiSwitch-track": {
        backgroundColor: neutral[100],
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {},
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: neutral[900],
    },
    "&.Mui-disabled .MuiSwitch-thumb": {},
    "&.Mui-disabled + .MuiSwitch-track": {},
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    color: neutral[900],
    height: 20,
    width: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    backgroundColor: neutral[100],
    opacity: 1,
  },
});

const Switch = React.forwardRef(function Switch(props, ref) {
  return <SwitchRoot {...props} ref={ref} />;
});

export default Switch;
