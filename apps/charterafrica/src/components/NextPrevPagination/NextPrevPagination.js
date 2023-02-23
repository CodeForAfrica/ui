import { usePagination, styled } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import PaginationButton from "./PaginationButton";

const NextPreviousPaginationListRoot = styled("ul")({
  listStyle: "none",
  padding: 0,
  display: "flex",
  columnGap: "20px",
  justifyContent: "center",
  marginBottom: 0,
  paddingBottom: "20px",
});

const NextPrevPagination = React.forwardRef(function NextPrevPagination(
  props,
  ref
) {
  const { count, onChange } = props;
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
    <NextPreviousPaginationListRoot ref={ref} {...other} sx={{ zIndex: 1 }}>
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
  );
});

export default NextPrevPagination;
