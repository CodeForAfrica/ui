import { usePagination, styled, Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import PaginationButton from "./PaginationButton";

import { secondary } from "@/charterafrica/colors";

const NextPreviousPaginationListRoot = styled("ul")({
  listStyle: "none",
  padding: 0,
  display: "flex",
  columnGap: "20px",
  justifyContent: "center",
  margin: 0,
});

const NextPrevPagination = React.forwardRef(
  function NextPrevPagination(props, ref) {
    const { count, onChange, sx } = props;
    const { items } = usePagination(props);
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
      <Box bgcolor={secondary[50]} sx={sx} ref={ref}>
        <NextPreviousPaginationListRoot>
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
      </Box>
    );
  },
);

export default NextPrevPagination;
