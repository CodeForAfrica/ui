import { RichTypography } from "@commons-ui/core";
import { Box, Grid, TextField } from "@mui/material";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import ComboBox from "@/charterafrica/components/ComboBox/ComboBox";
import { ControlledSearchInput } from "@/charterafrica/components/SearchInput";

const EcosystemFilter = React.forwardRef(function EcosystemFilter(props, ref) {
  const { onChange, searchPlaceholder, values, filterOptions = [] } = props;

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
          <ControlledSearchInput
            value={values.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder={searchPlaceholder}
            sx={{
              backgroundColor: "common.white",
              typography: "p1",
              width: "100%",
            }}
          />
        </Grid>
        {filterOptions.map((option) => {
          if (option.type === "select" && option.options.length) {
            const value = values[option.name] || "";
            const optValue = option.options.find((opt) => value === opt.value);

            const onItemChange = (_, v) => {
              onChange({ [option.name]: v });
            };
            return (
              <Grid key={option.name} item xs={12} lg={3}>
                <ComboBox
                  size="small"
                  options={option.options}
                  label={option.label}
                  value={optValue?.value}
                  onChange={onItemChange}
                  sx={{
                    borderColor: neutral[400],
                  }}
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
                      sx={{
                        backgroundColor: neutral[50],

                        borderRadius: 0.5,
                      }}
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
