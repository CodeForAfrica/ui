import { RichTypography } from "@commons-ui/core";
import { Autocomplete, Box, Grid, SvgIcon, TextField } from "@mui/material";
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
    <Box sx={{ pb: 3.75 }} bgcolor="common.white" ref={ref}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        columnGap={1.25}
        rowGap={1.25}
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
            const value = values[option.name] || "";
            const optValue = option.options.find((opt) => value === opt.value);

            const onItemChange = (e, target) => {
              onChange({ [option.name]: target?.value });
            };
            return (
              <Grid key={option.name} item xs={3.75} lg={3}>
                <Autocomplete
                  size="small"
                  options={option.options}
                  getOptionLabel={(opt) => opt.label || option.label}
                  popupIcon={
                    <SvgIcon
                      inheritViewBox
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        fill: "none",
                        mt: 0.5,
                      }}
                      component={ChevronDown}
                    />
                  }
                  value={optValue}
                  onChange={onItemChange}
                  isOptionEqualToValue={(opt) => opt?.value === optValue?.value}
                  renderOption={(optionProps, opt) => (
                    <li {...optionProps}>
                      <RichTypography variant="p1">{opt.label}</RichTypography>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      value={params.value || ""}
                      sx={{ backgroundColor: neutral[50] }}
                    />
                  )}
                />
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </Box>
  );
});

export default EcosystemFilter;
