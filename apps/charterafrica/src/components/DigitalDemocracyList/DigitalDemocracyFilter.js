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
                width: "200px",
              }}
            />
          </Grid>
          {sortOrder?.length > 0 ? (
            <Grid item md="auto">
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
                  minWidth: "200px",
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
