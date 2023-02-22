import { Typography, PaginationItem } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const StyledPagination = styled(Pagination)(() => ({
  variant: "outlined",
  shape: "rounded",
  "& button": {
    padding: "8px 16px",
    borderRadius: "4px",
    height: "33px",
    border: "none",
  },
  "& .MuiPagination-ul": {
    justifyContent: "center",
  },
}));

function NavigationLabel(color, variant, text) {
  return (
    <Typography color={color} variant={variant}>
      {text}
    </Typography>
  );
}

const NextPrevPagination = React.forwardRef(function NextPrevPagination(
  props,
  ref
) {
  const { count, onPageChange, hideDisabledButtons = false, sx } = props;

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        justifyContent: "center",
        ...sx,
      }}
    >
      <StyledPagination
        onChange={onPageChange}
        count={count}
        renderItem={(item) => {
          if (item.type !== "next" && item.type !== "previous") {
            return null;
          }
          if (
            item.type === "previous" &&
            item.page === 0 &&
            hideDisabledButtons
          ) {
            return null;
          }
          if (
            item.type === "next" &&
            item.page === count - 1 &&
            hideDisabledButtons
          ) {
            return null;
          }
          return (
            <PaginationItem
              {...item}
              slots={{
                next: () =>
                  NavigationLabel("neutral.dark", "p3SemiBold", "Next"),
                previous: () =>
                  NavigationLabel("neutral.light", "p3SemiBold", "Prev"),
              }}
              sx={{
                backgroundColor:
                  item.type === "next" ? "secondary.main" : neutral[100],

                "&:hover": {
                  backgroundColor:
                    item.type === "next" ? "secondary.main" : neutral[100],
                },
              }}
            />
          );
        }}
      />
    </Box>
  );
});

export default NextPrevPagination;
