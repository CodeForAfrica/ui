import { Box, Grid, Select, MenuItem, Chip, Typography } from "@mui/material";
import React, { useState } from "react";

import { neutral } from "@/charterafrica/colors";
import SearchInput from "@/charterafrica/components/SearchInput";

const DatasetFilterBar = React.forwardRef(function DatasetFilterBar(
  props,
  ref
) {
  const { onChange, search: searchProp, countries, tags } = props;

  const [value, setValue] = useState(searchProp || "");
  const [sort, setSort] = useState("metadata_modified desc");
  const [country, setCountry] = useState("All Countries");
  const [tag, setTag] = useState("All Tags");

  const handleChangeQ = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    if (onChange) {
      onChange(e, value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (onChange) {
        onChange(e, value);
      }
    }
  };

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };

  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleChangeTag = (e) => {
    setTag(e.target.value);
  };

  const sortOrder = [
    {
      label: "Most Recent",
      value: "metadata_modified desc",
    },
    {
      label: "Least Recent",
      value: "metadata_modified asc",
    },
    {
      label: "Name (A-Z)",
      value: "name asc",
    },
    {
      label: "Name (Z-A)",
      value: "name desc",
    },
  ];

  return (
    <Box py={5} ref={ref}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2.4}>
          <SearchInput
            placeholder="Search Database"
            value={value}
            onChange={handleChangeQ}
            onClick={handleClick}
            onKeyPress={handleKeyPress}
            sx={{
              backgroundColor: "#fff",
              height: "36px",
              typography: "p1",
              width: "200px",
            }}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
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
        <Grid item xs={12} md={2.4}>
          <Select
            inputProps={{
              "aria-label": "Without label",
            }}
            onChange={handleChangeCountry}
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
            value={country}
          >
            {countries.map((singleCountry) => (
              <MenuItem value={singleCountry} key={singleCountry}>
                {singleCountry}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <Select
            inputProps={{
              "aria-label": "Without label",
            }}
            onChange={handleChangeTag}
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
            value={tag}
          >
            {tags.map((singleTag) => (
              <MenuItem value={singleTag} key={singleTag}>
                {singleTag}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="p1" color="neutral.main" pr={2}>
            Show:
          </Typography>
          <Chip
            label="Documents"
            sx={(theme) => ({
              backgroundColor: theme.palette.success.main,
              ...theme.typography.caption,
              borderRadius: "10px",
              mr: 1.75,
            })}
          />
          <Chip
            label="Datasets"
            sx={(theme) => ({
              backgroundColor: theme.palette.error.main,
              ...theme.typography.caption,
              borderRadius: "10px",
              mr: 1.75,
            })}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
