import { Box, ButtonBase, SvgIcon } from "@mui/material";
import React, { forwardRef, useMemo } from "react";

import ArrowLeft from "@/trustlab/assets/icons/arrow-left.svg";
import ArrowRight from "@/trustlab/assets/icons/arrow-right.svg";

function usePaginationItems({
  page,
  count, // total pages
  siblingCount = 1,
  boundaryCount = 1,
}) {
  return useMemo(() => {
    const startPages = Array.from(
      { length: Math.min(boundaryCount, count) },
      (_, i) => i + 1,
    );

    const endPages = Array.from(
      { length: Math.min(boundaryCount, count) },
      (_, i) => count - i,
    ).reverse();

    const siblingsStart = Math.max(
      Math.min(
        page - siblingCount,
        count - boundaryCount - siblingCount * 2 - 1,
      ),
      boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length ? endPages[0] - 2 : count - 1,
    );

    const middleRange =
      siblingsEnd >= siblingsStart
        ? Array.from(
            { length: siblingsEnd - siblingsStart + 1 },
            (_, i) => siblingsStart + i,
          )
        : [];

    const maybeStart = (() => {
      if (siblingsStart > boundaryCount + 2) {
        return ["start-ellipsis"];
      }
      if (boundaryCount + 1 < count - boundaryCount) {
        return [boundaryCount + 1];
      }
      return [];
    })();

    const maybeEnd = (() => {
      if (siblingsEnd < count - boundaryCount - 1) {
        return ["end-ellipsis"];
      }
      if (count - boundaryCount > boundaryCount) {
        return [count - boundaryCount];
      }
      return [];
    })();

    const prelim = [
      ...startPages,
      ...maybeStart,
      ...middleRange,
      ...maybeEnd,
      ...endPages,
    ];

    return prelim.filter((v, i, arr) => arr.indexOf(v) === i);
  }, [page, count, siblingCount, boundaryCount]);
}

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
        "&:hover": {
          bgcolor: "action.hover",
        },
        ...sx,
      }}
    >
      {children}
    </ButtonBase>
  );
}

function Ellipsis({ first }) {
  return (
    <Box
      sx={{
        height: 40,
        minWidth: 48,
        px: 2,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderLeft: first ? "none" : "1px solid",
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
 * ReportsPagination
 *
 * Props:
 * - page: number (1-based current page)
 * - count: number (total pages; pass Math.ceil(totalItems / pageSize) if you have item counts)
 * - onChange: (nextPage: number) => void
 * - siblingCount?: number (pages to show around current)
 * - boundaryCount?: number (pages to always show at edges)
 * - disabled?: boolean
 * - itemSx?, arrowSx?: SxProps for item/arrow styling
 * - ...rest forwarded to the root Box
 */
const ReportsPagination = forwardRef(function ReportsPagination(
  {
    page = 1,
    count = 1, // total pages
    onChange,
    siblingCount = 1,
    boundaryCount = 1,
    disabled = false,
    // style overrides
    itemSx,
    arrowSx,
    // forward anything else to root
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

  if (count <= 1) {
    return null;
  }

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
      {items.map((it) => {
        if (typeof it === "string") {
          return <Ellipsis key={it} first={false} />;
        }
        return (
          <Item
            key={it}
            selected={it === page}
            disabled={disabled}
            onClick={() => goTo(it)}
            sx={itemSx}
          >
            {it}
          </Item>
        );
      })}
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

export default ReportsPagination;
