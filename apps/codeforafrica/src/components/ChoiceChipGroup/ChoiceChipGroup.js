import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";

const ChoiceChipGroupRoot = styled(ToggleButtonGroup, {
  slot: "Root",
})(({ theme }) => ({
  // We're styling ToggleButtonGroup here instead of in the theme because
  // this isn't the primary use of ToggleButtonGroup and hence we don't want
  // to globally change its styling.
  borderRadius: 3,
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  "& .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
  },
  "& .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
  },
  "& .MuiChip-filled.MuiToggleButtonGroup-grouped": {
    "&:not(:first-of-type)": {
      margin: 0,
      border: `1px solid ${theme.palette.background.main}`,
    },
  },
  "& .MuiChip-filledPrimary.MuiToggleButtonGroup-grouped": {
    "&:not(:first-of-type)": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

const ChoiceChipGroup = React.forwardRef(function ChoiceChipGroup(props, ref) {
  return <ChoiceChipGroupRoot exclusive {...props} ref={ref} />;
});

export default ChoiceChipGroup;
