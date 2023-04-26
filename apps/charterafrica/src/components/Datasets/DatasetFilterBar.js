import { Box, Grid } from "@mui/material";
import React, { useState } from "react";

import SearchInput from "@/charterafrica/components/SearchInput";

const DatasetFilterBar = React.forwardRef(function DatasetFilterBar(
  props,
  ref
) {
  const { onChange, search: searchProp } = props;

  const [value, setValue] = useState(searchProp || "");

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

  return (
    <Box py={5} ref={ref}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
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
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
