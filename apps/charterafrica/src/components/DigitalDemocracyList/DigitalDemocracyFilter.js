import { Section } from "@commons-ui/core";
import { Box, Grid, Select, MenuItem } from "@mui/material";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import SearchInput from "@/charterafrica/components/SearchInput";

const DigitalDemocracyFilter = React.forwardRef(function ToolsFilter(
  props,
  ref
) {
  const {
    onChange,
    searchPlaceholder,
    values: { search, sort },
    sortOrder,
    onQuerySearch,
  } = props;
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (onQuerySearch) {
        onQuerySearch();
      }
    }
  };
  return (
    <Box bgcolor="#fff" ref={ref}>
      <Section
        sx={{
          py: 2.5,
        }}
      >
        <Grid container alignItems="center" gap={5}>
          <Grid item xs={12} md={4}>
            <SearchInput
              value={search}
              onChange={(e) => onChange({ search: e.target.value })}
              placeholder={searchPlaceholder}
              onKeyPress={handleKeyPress}
              onClick={onQuerySearch}
              sx={{
                backgroundColor: "common.white",
                height: "36px",
                typography: "p1",
                width: "100%",
              }}
            />
          </Grid>
          {sortOrder?.length > 0 ? (
            <Grid item xs={4}>
              <Select
                onChange={(e) => onChange({ sort: e.target.value })}
                value={sort}
                inputProps={{
                  "aria-label": "Without label",
                }}
                MenuProps={{
                  sx: {
                    color: "neutral.dark",
                    typography: "p1",
                  },
                }}
                sx={{
                  backgroundColor: neutral[50],
                  height: "36px",
                  width: "100%",
                  typography: "p1",
                }}
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

export default DigitalDemocracyFilter;
