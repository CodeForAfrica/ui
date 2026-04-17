import { Box, ButtonBase, SvgIcon, TextField } from "@mui/material";
import usePagination from "@mui/material/usePagination";
import React, { forwardRef, useState } from "react";

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
 * - showJumpToPage: boolean to show/hide jump to page input
 * - jumpToPageLabel: label for the jump to page input
 */
const Pagination = forwardRef(function Pagination(
  {
    page = 1,
    count = 1,
    onChange,
    siblingCount = 1,
    boundaryCount = 1,
    disabled = false,
    showJumpToPage = true,
    itemSx,
    arrowSx,
    sx,
  },
  ref,
) {
  const [jumpValue, setJumpValue] = useState(page);

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

  const handleJumpToPage = (e) => {
    if (e.key === "Enter") {
      const pageNum = parseInt(jumpValue, 10);
      if (
        !Number.isNaN(pageNum) &&
        pageNum >= 1 &&
        pageNum <= count &&
        onChange
      ) {
        onChange(pageNum);
        setJumpValue(pageNum);
      }
    }
  };

  const handleJumpInputChange = (e) => {
    const { value } = e.target;
    // Only allow numeric input
    if (value === "" || /^\d+$/.test(value)) {
      setJumpValue(value);
    }
  };

  if (count <= 1) {
    return null;
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={sx}
      ref={ref}
    >
      {showJumpToPage && count > 1 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            value={jumpValue}
            onChange={handleJumpInputChange}
            onKeyDown={handleJumpToPage}
            disabled={disabled}
            size="small"
            placeholder={count.toString()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
              "& .MuiOutlinedInput-input": {
                textAlign: "center",
                width: 40,
                padding: "8px 12px",
              },
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
        aria-label="pagination navigation"
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
    </Box>
  );
});

export default Pagination;
