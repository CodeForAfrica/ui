import { Typography, PaginationItem } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import React from "react";

import { neutral } from "@/charterafrica/colors";

function NextNavButton() {
  return (
    <Typography color="neutral.dark" variant="p3SemiBold">
      Next
    </Typography>
  );
}

function PrevNavButton() {
  return (
    <Typography color="neutral.light" variant="p3SemiBold">
      Prev
    </Typography>
  );
}

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

const NextPrevPagination = React.forwardRef(function NextPrevPagination(
  props,
  ref
) {
  const { count, onPageChange, sx } = props;

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
          return (
            <PaginationItem
              {...item}
              slots={{
                next: NextNavButton,
                previous: PrevNavButton,
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
