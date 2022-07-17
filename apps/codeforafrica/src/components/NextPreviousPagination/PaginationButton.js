import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import ArrowBackIcon from "@/codeforafrica/assets/icons/Type=arrow-left, Size=32, Color=CurrentColor.svg";
import ArrowForwardIcon from "@/codeforafrica/assets/icons/Type=arrow-right, Size=32, Color=CurrentColor.svg";

const PaginationButton = React.forwardRef(function PaginationButton(
  props,
  ref
) {
  const { component, disabled, onClick, page, type } = props;

  // type === previous
  let Icon = ArrowBackIcon;
  let display = page === 0 ? "none" : "initial";
  let label = type.slice(0, 4);
  if (type === "next") {
    // page === 2 means current page === 1
    Icon = page === 2 ? undefined : ArrowForwardIcon;
    display = "initial";
    label = page === 2 ? "See More" : type.slice(0, 4);
  }
  const icon = Icon ? (
    <SvgIcon component={Icon} style={{ fontSize: 16 }} viewBox="0 0 32 32" />
  ) : undefined;
  const startIcon = type === "previous" ? icon : undefined;
  const endIcon = type === "next" ? icon : undefined;

  return (
    <Box component={component} sx={{ display }} ref={ref}>
      <Button
        disabled={disabled}
        onClick={onClick}
        startIcon={startIcon}
        sx={{
          color: "text.secondary",
          "&.Mui-disabled": {
            bgcolor: "grey.light",
            borderColor: "grey.light",
            color: "grey.main",
          },
        }}
        endIcon={endIcon}
        variant="contained"
      >
        {label}
      </Button>
    </Box>
  );
});

export default PaginationButton;
