import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import usePagination from "@mui/material/usePagination";
import React from "react";

import ArrowBackIcon from "@/codeforafrica/assets/icons/Type=arrow-left, Size=32, Color=White.svg";
import ArrowForwardIcon from "@/codeforafrica/assets/icons/Type=arrow-right, Size=32, Color=White.svg";
import TwoToneBackground from "@/codeforafrica/components/TwoToneBackground";

const NextPreviousPaginationListRoot = styled("ul")(({ theme }) => ({
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
    <TwoToneBackground component="nav" ref={ref}>
      <NextPreviousPaginationListRoot {...other} sx={{ zIndex: 1 }}>
        {items
          .filter(({ type }) => ["previous", "next"].includes(type))
          .map(({ disabled, onClick, page, type }) => {
            // type === previous
            let component = ArrowBackIcon;
            let display = page === 0 ? "none" : "initial";
            let label = type.slice(0, 4);
            if (type === "next") {
              // page === 2 means current page === 1
              component = page === 2 ? undefined : ArrowForwardIcon;
              display = "initial";
              label = page === 2 ? "See More" : type.slice(0, 4);
            }
            const icon = component ? (
              <SvgIcon
                component={component}
                style={{ fontSize: 16 }}
                viewBox="0 0 32 32"
              />
            ) : undefined;
            const startIcon = type === "previous" ? icon : undefined;
            const endIcon = type === "next" ? icon : undefined;
            return (
              <Box component="li" sx={{ display }} key={type}>
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
                  {label}
                </Button>
              </Box>
            );
          })}
      </NextPreviousPaginationListRoot>
    </TwoToneBackground>
  );
});

export default NextPreviousPagination;
