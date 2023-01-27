import { Box } from "@mui/material";
import React, { useState } from "react";

import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import Switch from "@/charterafrica/components/Switch";

const ToggleSwitch = React.forwardRef(function ToggleSwitch(props, ref) {
  const {
    EndLabelProps,
    StartLabelProps,
    SwitchProps,
    endLabel,
    startLabel,
    ...other
  } = props;
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (SwitchProps?.onChange) {
      SwitchProps?.onChange?.(e);
    }
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      gap={1.25}
      flexWrap="nowrap"
      {...other}
      ref={ref}
    >
      <LineClampedRichTypography
        color={checked ? neutral[300] : neutral[900]}
        lineClamp={1}
        variant="p3SemiBold"
        {...StartLabelProps}
      >
        {startLabel}
      </LineClampedRichTypography>
      <Switch {...SwitchProps} onChange={handleChange} />
      <LineClampedRichTypography
        color={checked ? neutral[900] : neutral[300]}
        lineClamp={1}
        variant="p3SemiBold"
        {...EndLabelProps}
      >
        {endLabel}
      </LineClampedRichTypography>
    </Box>
  );
});

export default ToggleSwitch;
