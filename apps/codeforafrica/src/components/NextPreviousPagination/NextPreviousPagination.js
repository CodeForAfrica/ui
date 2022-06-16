import { styled } from "@mui/material/styles";
import usePagination from "@mui/material/usePagination";
import React from "react";

import PaginationButton from "./PaginationButton";

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
          .map((itemProps) => (
            <PaginationButton {...itemProps} component="li" />
          ))}
      </NextPreviousPaginationListRoot>
    </TwoToneBackground>
  );
});

export default NextPreviousPagination;
