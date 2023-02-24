import { Box, Button } from "@mui/material";
import React from "react";

import { neutral } from "@/charterafrica/colors";

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
  // Show "SEE MORE" instead of NEXT on the first page
  if (type === "next" && page === 2) {
    label = "SEE MORE";
  } else {
    label = type.slice(0, 4);
  }

  return (
    <Box component={component} ref={ref}>
      <Button
        disabled={disabled}
        onClick={onClick}
        sx={{
          color: type === "next" ? "neutral.dark" : "neutral.light",
          backgroundColor: type === "next" ? "secondary.main" : neutral[100],
          "&:hover": {
            backgroundColor: type === "next" ? "secondary.main" : neutral[100],
          },
          "&:focus": {
            backgroundColor: type === "next" ? "secondary.main" : neutral[100],
          },
          textTransform: "capitalize",
        }}
        variant="contained"
      >
        {label}
      </Button>
    </Box>
  );
});

export default PaginationButton;
