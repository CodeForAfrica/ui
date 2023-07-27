import { Box, Button, SvgIcon } from "@mui/material";
import React from "react";

import ArrowBackIcon from "@/codeforafrica/assets/icons/Type=arrow-left, Size=32, Color=CurrentColor.svg";
import ArrowForwardIcon from "@/codeforafrica/assets/icons/Type=arrow-right, Size=32, Color=CurrentColor.svg";

const PaginationButton = React.forwardRef(function PaginationButton(
  props,
  ref
) {
  const { component, disabled, onClick, page, type } = props;

  // Don't show PREV on the first page
  if (page === 0) {
    return null;
  }
  let label;
  let startIcon;
  let endIcon;
  // Show "SEE MORE" instead of NEXT on the first page
  if (type === "next" && page === 2) {
    label = "SEE MORE";
  } else {
    label = type.slice(0, 4);
    const Icon = type === "next" ? ArrowForwardIcon : ArrowBackIcon;
    const icon = (
      <SvgIcon component={Icon} style={{ fontSize: 16 }} viewBox="0 0 32 32" />
    );
    if (type === "next") {
      endIcon = icon;
    } else {
      startIcon = icon;
    }
  }

  return (
    <Box component={component} ref={ref}>
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
