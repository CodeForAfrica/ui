import { usePagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
  const { count, onChange, sx } = props;
  const { items, ...other } = usePagination(props);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && onChange) {
      const { page } = router.query;
      const initialPage = Number.parseInt(page, 10);
      if (initialPage) {
        onChange(undefined, initialPage);
      }
    }
    // We're only interested in initial isReady and not any subsequent
    // router.query changes e.g. due to pagination
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!count || count < 2) {
    return null;
  }
  return (
    <TwoToneBackground component="nav" sx={sx} ref={ref}>
      <NextPreviousPaginationListRoot {...other} sx={{ zIndex: 1 }}>
        {items
          .filter(({ type }) => ["previous", "next"].includes(type))
          .map((itemProps) => (
            <PaginationButton
              {...itemProps}
              component="li"
              key={itemProps.type}
            />
          ))}
      </NextPreviousPaginationListRoot>
    </TwoToneBackground>
  );
});

export default NextPreviousPagination;
