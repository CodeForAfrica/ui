import { Section } from "@commons-ui/core";
import { Box, Grid, Select, MenuItem } from "@mui/material";
import React from "react";

import ChevronDown from "@/charterafrica/assets/icons/Type=chevron-down, Size=16, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";
import SearchInput from "@/charterafrica/components/SearchInput";

const EcosystemFilter = React.forwardRef(function EcosystemFilter(props, ref) {
  const {
    onChange,
    searchPlaceholder,
    values,
    onQuerySearch,
    filterOptions = [],
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
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          columnGap={{ xs: 3, sm: 3 }}
          rowGap={3}
        >
          <Grid item xs={12} lg={2}>
            <SearchInput
              value={values.search}
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
          {filterOptions.map((option) => {
            if (option.type === "select" && option.options.length) {
              const renderValue = (value) => {
                let output = option.label;
                if (value.length) {
                  if (Array.isArray(value)) {
                    return value.join(", ");
                  }
                  output = value;
                }
                return output;
              };
              return (
                <Grid key={option.name} item xs={3.5} lg={3}>
                  <Select
                    label={option.label}
                    IconComponent={ChevronDown}
                    onChange={(e) =>
                      onChange({ [option.name]: e.target.value })
                    }
                    displayEmpty
                    renderValue={renderValue}
                    value={values[option.name] || ""}
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
                    {option.options.map((order) => (
                      <MenuItem value={order.value} key={order.value}>
                        {order.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      </Section>
    </Box>
  );
});

export default EcosystemFilter;
