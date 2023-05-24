import { Section } from "@commons-ui/core";
import { Box, Grid, Typography, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { neutral } from "@/charterafrica/colors";
import { ControlledSearchInput } from "@/charterafrica/components/SearchInput";

const ArticlesFilterBar = React.forwardRef(function ArticlesFilterBar(
  props,
  ref
) {
  const {
    onChangeSort,
    onChangeQ,
    q,
    search: searchProp,
    sort,
    sortOrder,
    title,
  } = props;
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { sort: initialSort, q: initialQ } = router.query;
      if (initialSort && onChangeSort) {
        onChangeSort(undefined, initialSort);
      }
      if (initialQ && onChangeQ) {
        onChangeQ(undefined, initialQ);
      }
    }
    // We're only interested in initial isReady and not any subsequent
    // router.query changes e.g. due to search
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleChangeQ = (e, value) => {
    if (onChangeQ) {
      onChangeQ(e, value);
    }
  };
  const handleChangeSort = (e) => {
    if (onChangeSort) {
      onChangeSort(e, e.target.value);
    }
  };

  return (
    <Box
      bgcolor="#fff"
      ref={ref}
      sx={{
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      <Section
        sx={{
          py: 2.5,
        }}
      >
        <Grid container alignItems="center" gap={5} wrap="nowrap">
          <Grid item md="auto">
            <Typography variant="h5" color={neutral[800]}>
              {title}
            </Typography>
          </Grid>
          <Grid item md="auto">
            <ControlledSearchInput
              value={q}
              placeholder={searchProp?.placeholder}
              onChange={handleChangeQ}
              sx={{
                backgroundColor: "#fff",
                height: "36px",
                typography: "p1",
                width: "200px",
              }}
              key={q}
            />
          </Grid>
          {sortOrder?.length > 0 ? (
            <Grid item md="auto">
              <Select
                inputProps={{
                  "aria-label": "Without label",
                }}
                onChange={handleChangeSort}
                MenuProps={{
                  sx: {
                    color: "neutral.dark",
                    typography: "p1",
                  },
                }}
                sx={{
                  backgroundColor: neutral[50],
                  height: "36px",
                  minWidth: "200px",
                  typography: "p1",
                }}
                value={sort}
              >
                {sortOrder.map((order) => (
                  <MenuItem value={order.value} key={order.value}>
                    {order.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          ) : null}
        </Grid>
      </Section>
    </Box>
  );
});

export default ArticlesFilterBar;
