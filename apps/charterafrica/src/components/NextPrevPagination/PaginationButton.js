import { Box, Button } from "@mui/material";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const PaginationButton = React.forwardRef(
  function PaginationButton(props, ref) {
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
          color="secondary"
          disabled={disabled}
          onClick={onClick}
          size="small"
          variant="contained"
          sx={{
            color: "neutral.dark",
            textTransform: "capitalize",
            "&.Mui-disabled": {
              backgroundColor: neutral[100],
              color: "neutral.light",
            },
          }}
        >
          {label}
        </Button>
      </Box>
    );
  },
);

export default PaginationButton;
