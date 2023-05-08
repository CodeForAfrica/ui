import {
  Box,
  Grid,
  Checkbox,
  styled,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { neutral } from "@/charterafrica/colors";
import SearchInput from "@/charterafrica/components/SearchInput";

const StyledCheckbox = styled(Checkbox)({
  color: neutral[900],
  "&.Mui-checked": {
    color: neutral[500],
  },
});

const StyledAutocompleteInput = styled(TextField)({
  overflow: "hidden",
  "& .MuiInputBase-root": {
    height: "36px",
    padding: "0 0 0 8px",
  },
});

const StyledAutocompleteTags = styled(Typography)({
  textTransform: "capitalize",
  color: neutral[900],
  typography: "p1",
});

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

  const handleChangeSort = (e, selectedSortOption) => {
    if (selectedSortOption?.value) {
      onSortChange(e, selectedSortOption.value);
    } else {
      onSortChange(e, "");
    }
  };

  const handleChangeCountry = (e, selectedCountries) => {
    if (onChangeCountries) {
      onChangeCountries(e, selectedCountries);
    }
  };

  const handleChangeTag = (e, selectedTags) => {
    if (onChangeTags) {
      onChangeTags(e, selectedTags);
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
          <Autocomplete
            options={sortOptions}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            onChange={handleChangeSort}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} overflow="hidden">
          <Autocomplete
            multiple
            options={countries}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderOption={(renderProps, option, { selected }) => (
              <li {...renderProps}>
                <StyledCheckbox checked={selected} />
                {option.toUpperCase()}
              </li>
            )}
            renderTags={(checkedCountries, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps}>
                {checkedCountries.length > 2
                  ? `${checkedCountries.length} countries`
                  : checkedCountries.join(", ")}
              </StyledAutocompleteTags>
            )}
            onChange={handleChangeCountry}
            sx={{
              backgroundColor: neutral[50],
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Autocomplete
            multiple
            options={tags}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderOption={(renderProps, option, { selected }) => (
              <li {...renderProps}>
                <StyledCheckbox checked={selected} />
                {option.toUpperCase()}
              </li>
            )}
            onChange={handleChangeTag}
            renderTags={(checkedTags, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps}>
                {checkedTags.length > 1
                  ? `${checkedTags.length} tags`
                  : checkedTags.join(", ")}
              </StyledAutocompleteTags>
            )}
            sx={{
              backgroundColor: neutral[50],
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
