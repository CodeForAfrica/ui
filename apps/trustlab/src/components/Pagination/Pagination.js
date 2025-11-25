import { Box, ButtonBase, SvgIcon } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import React, { forwardRef } from "react";

import ArrowLeft from "@/trustlab/assets/icons/arrow-left.svg";
import ArrowRight from "@/trustlab/assets/icons/arrow-right.svg";

function Item({ selected, disabled, children, onClick, sx }) {
  return (
    <ButtonBase
      disabled={disabled}
      onClick={onClick}
      sx={{
        height: 40,
        minWidth: 48,
        px: 2,
        borderLeft: "1px solid",
        borderColor: "divider",
        color: selected ? "#1020E1" : "text.primary",
        fontWeight: selected ? 700 : 500,
        "&:hover": { bgcolor: "action.hover" },
        ...sx,
      }}
    >
      {children}
    </ButtonBase>
  );
}

function Ellipsis() {
  return (
    <Box
      sx={{
        height: 40,
        minWidth: 48,
        px: 2,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderLeft: "1px solid",
        borderColor: "divider",
        color: "text.disabled",
        fontWeight: 600,
        letterSpacing: 2,
      }}
    >
      ...
    </Box>
  );
}

/**
 * Pagination (generic)
 * Props:
 * - page: current page (1-based)
 * - count: total pages
 * - onChange: (nextPage) => void
 */
const Pagination = forwardRef(function Pagination(
  {
    page = 1,
    count = 1,
    onChange,
    siblingCount = 1,
    boundaryCount = 1,
    disabled = false,
    itemSx,
    arrowSx,
    ...rest
  },
  ref,
) {
  const { items } = usePagination({
    page,
    count,
    siblingCount,
    boundaryCount,
    disabled,
    onChange: (_, value) => {
      if (disabled) {
        return;
      }
      if (onChange) {
        onChange(value);
      }
    },
  });

  if (count <= 1) {
    return null;
  }

  return (
    <Box
      ref={ref}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
      {...rest}
    >
      {items.map((item) => {
        const {
          type,
          page: itemPage,
          selected,
          disabled: itemDisabled,
          onClick,
        } = item;

        if (type === "start-ellipsis" || type === "end-ellipsis") {
          return <Ellipsis key={type} />;
        }

        if (type === "previous") {
          return (
            <Item
              key="prev"
              disabled={itemDisabled}
              onClick={onClick}
              sx={{
                color: itemDisabled ? "text.disabled" : "#1020E1",
                ...arrowSx,
                ...itemSx,
              }}
            >
              <SvgIcon
                component={ArrowLeft}
                inheritViewBox
                sx={{ fontSize: 18 }}
              />
            </Item>
          );
        }

        if (type === "next") {
          return (
            <Item
              key="next"
              disabled={itemDisabled}
              onClick={onClick}
              sx={{
                color: itemDisabled ? "text.disabled" : "#1020E1",
                ...arrowSx,
                ...itemSx,
              }}
            >
              <SvgIcon
                component={ArrowRight}
                inheritViewBox
                sx={{ fontSize: 18 }}
              />
            </Item>
          );
        }

        if (type === "page") {
          return (
            <Item
              key={itemPage}
              selected={selected}
              disabled={itemDisabled}
              onClick={onClick}
              sx={itemSx}
            >
              {itemPage}
            </Item>
          );
        }

        return null;
      })}
    </Box>
  );
});

export default Pagination;
