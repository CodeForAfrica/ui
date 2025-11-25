import { Box, ButtonBase, SvgIcon } from "@mui/material";
import React, { forwardRef } from "react";

import usePaginationItems from "./usePaginationItems";

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
  const items = usePaginationItems({
    page,
    count,
    siblingCount,
    boundaryCount,
  });

  const goTo = (p) => {
    if (disabled) {
      return;
    }
    if (p < 1 || p > count || p === page) {
      return;
    }
    if (onChange) {
      onChange(p);
    }
  };

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
      <Item
        disabled={disabled || page === 1}
        onClick={() => goTo(page - 1)}
        sx={{
          color: page === 1 ? "text.disabled" : "#1020E1",
          ...arrowSx,
          ...itemSx,
        }}
      >
        <SvgIcon component={ArrowLeft} inheritViewBox sx={{ fontSize: 18 }} />
      </Item>
      {items.map((it) =>
        typeof it === "string" ? (
          <Ellipsis key={it} />
        ) : (
          <Item
            key={it}
            selected={it === page}
            disabled={disabled}
            onClick={() => goTo(it)}
            sx={itemSx}
          >
            {it}
          </Item>
        ),
      )}
      <Item
        disabled={disabled || page === count}
        onClick={() => goTo(page + 1)}
        sx={{
          color: page === count ? "text.disabled" : "#1020E1",
          ...arrowSx,
          ...itemSx,
        }}
      >
        <SvgIcon component={ArrowRight} inheritViewBox sx={{ fontSize: 18 }} />
      </Item>
    </Box>
  );
});

export default Pagination;
