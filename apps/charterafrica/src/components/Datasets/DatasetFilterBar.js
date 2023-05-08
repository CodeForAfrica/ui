import {
  Box,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  styled,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { neutral } from "@/charterafrica/colors";
import SearchInput from "@/charterafrica/components/SearchInput";
import {
  DEFAULT_SORTING,
  DEFAULT_TAG,
} from "@/charterafrica/utils/datasets/queryString";

const StyledSelect = styled(Select)({
  backgroundColor: neutral[50],
  height: "36px",
  typography: "p1",
  overflow: "hidden",
  width: "100%",
});

const StyledMenuItem = styled(MenuItem)({
  "&.Mui-selected": {
    backgroundColor: neutral[200],
  },
  "&.Mui-selected:hover": {
    backgroundColor: neutral[200],
  },
});

const StyledCheckbox = styled(Checkbox)({
  color: neutral[900],
  "&.Mui-checked": {
    color: neutral[500],
  },
});

const menuProps = {
  sx: {
    color: neutral[900],
    typography: "p1",
  },
};

const DatasetFilterBar = React.forwardRef(function DatasetFilterBar(
  props,
  ref
) {
  const {
    onQChange,
    onSortChange,
    onChangeCountries,
    onChangeTags,
    search: searchProp,
    countries,
    tags,
    sortOptions,
  } = props;

  const [value, setValue] = useState(searchProp || "");
  const [sort, setSort] = useState(DEFAULT_SORTING);
  // const [country, setCountry] = useState([DEFAULT_COUNTRY]);
  const [tag, setTag] = useState([DEFAULT_TAG]);

  const handleChangeQ = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    if (onQChange) {
      onQChange(e, value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (onQChange) {
        onQChange(e, value);
      }
    }
  };

  const handleChangeSort = (e) => {
    setSort(e.target.value);
    if (onSortChange) {
      onSortChange(e, e.target.value);
    }
  };

  const handleChangeCountry = (e, selectedCountries) => {
    onChangeCountries(e, selectedCountries);
  };

  const handleChangeTag = (e) => {
    const {
      target: { value: checkedTags },
    } = e;

    if (checkedTags.length > 1) {
      const selectedTags = checkedTags.filter((t) => t !== DEFAULT_TAG);
      setTag(selectedTags);
    } else {
      setTag([DEFAULT_TAG]);
    }

    if (onChangeTags) {
      onChangeTags(e, checkedTags);
    }
  };

  return (
    <Box py={5} ref={ref}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
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
              width: "100%",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <StyledSelect
            onChange={handleChangeSort}
            MenuProps={menuProps}
            value={sort}
          >
            {sortOptions.map((option) => (
              <StyledMenuItem value={option.value} key={option.value}>
                {option.label}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </Grid>
        <Grid item xs={12} sm={4} lg={3} overflow="hidden">
          <Autocomplete
            multiple
            options={countries}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  height: "36px",
                  overflow: "hidden",
                }}
              />
            )}
            getOptionLabel={(option) => option.toUpperCase()}
            renderOption={(renderProps, option, { selected }) => (
              <li {...renderProps}>
                <StyledCheckbox checked={selected} />
                {option}
              </li>
            )}
            onChange={handleChangeCountry}
            renderTags={(checkedCountries, getTagProps) => {
              return (
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  {...getTagProps}
                >
                  {checkedCountries.length > 3
                    ? `${checkedCountries.length} countries`
                    : checkedCountries.join(", ")}
                </Typography>
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <StyledSelect
            multiple
            renderValue={(selected) => selected.join(", ")}
            onChange={handleChangeTag}
            MenuProps={menuProps}
            value={tag}
          >
            <MenuItem value={DEFAULT_TAG} key={DEFAULT_TAG}>
              {DEFAULT_TAG}
            </MenuItem>
            {tags.map((singleTag) => (
              <StyledMenuItem value={singleTag} key={singleTag}>
                <StyledCheckbox checked={tag.indexOf(singleTag) > -1} />
                <ListItemText
                  sx={{
                    textTransform: "capitalize",
                  }}
                  primary={singleTag}
                />
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </Grid>
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
