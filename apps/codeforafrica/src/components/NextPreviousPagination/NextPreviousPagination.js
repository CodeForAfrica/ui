import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import usePagination from "@mui/material/usePagination";
import React from "react";

import ArrowBackIcon from "@/codeforafrica/assets/icons/Type=arrow-left, Size=32, Color=White.svg";
import ArrowForwardIcon from "@/codeforafrica/assets/icons/Type=arrow-right, Size=32, Color=White.svg";

const NextPreviousPaginationRoot = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: `${theme.typography.pxToRem(53.5)} 0`,
  display: "flex",
  columnGap: "20px",
}));

const NextPreviousPagination = React.forwardRef(function NextPreviousPagination(
  props,
  ref
) {
  const { count } = props;
  const { items, ...other } = usePagination(props);

  if (count < 2) {
    return null;
  }
  return (
    <Box
      component="nav"
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <NextPreviousPaginationRoot {...other} ref={ref}>
        {items
          .filter(({ type }) => ["previous", "next"].includes(type))
          .map(({ type, disabled, onClick }) => {
            const component =
              type === "previous" ? ArrowBackIcon : ArrowForwardIcon;
            const viewBox = "0 0 32 32";
            const icon = (
              <SvgIcon
                component={component}
                style={{ fontSize: 16 }}
                viewBox={viewBox}
              />
            );
            const startIcon = type === "previous" ? icon : null;
            const endIcon = type === "next" ? icon : null;
            return (
              <li key={type}>
                <Button
                  disabled={disabled}
                  onClick={onClick}
                  startIcon={startIcon}
                  sx={{
                    "&.Mui-disabled": {
                      bgcolor: "primary.main",
                      color: "text.secondary",
                    },
                  }}
                  endIcon={endIcon}
                  variant="contained"
                >
                  {type.slice(0, 4)}
                </Button>
              </li>
            );
          })}
      </NextPreviousPaginationRoot>
    </Box>
  );
});

export default NextPreviousPagination;
