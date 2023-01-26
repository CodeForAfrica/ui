import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import ArrowDropDownIcon from "@/charterafrica/assets/icons/Type=chevron-down, Size=16, Color=CurrentColor.svg";
import ArrowDropUpIcon from "@/charterafrica/assets/icons/Type=chevron-up, Size=16, Color=CurrentColor.svg";

function OpenCloseIcon({ open, ...props }) {
  const ArrowIcon = open ? ArrowDropUpIcon : ArrowDropDownIcon;

  return (
    <SvgIcon
      {...props}
      component={ArrowIcon}
      viewBox="0 0 16 16"
      sx={{
        color: "text.primary",
        display: "inline-flex",
        fill: "none",
        fontSize: 16,
        ...props?.sx,
      }}
    />
  );
}

export default OpenCloseIcon;
