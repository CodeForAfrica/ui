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

const StyledAutocomplete = styled(Autocomplete)({
  backgroundColor: neutral[50],
  border: "1px solid",
  borderColor: neutral[900],
  borderRadius: "4px",
  "& .MuiOutlinedInput-root": {
    py: 0,
    border: "none",
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
    labels,
    tags,
    sortOptions,
  } = props;

  const [value, setValue] = useState(searchProp || "");
  const [selectedCountries, setSelectedCountries] = useState([
    labels.countries,
  ]);
  const [selectedTags, setSelectedTags] = useState([labels.tags]);

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

  const handleChangeCountry = (e, checkedCountries) => {
    let filteredCountries = [];
    if (checkedCountries.length > 0) {
      filteredCountries = checkedCountries.filter(
        (country) => country !== labels.countries
      );
      setSelectedCountries(filteredCountries);
      if (onChangeCountries) {
        onChangeCountries(e, filteredCountries);
      }
    } else {
      filteredCountries = [labels.countries];
      setSelectedCountries(filteredCountries);
      if (onChangeCountries) {
        onChangeCountries(e, []);
      }
    }
  };

  const handleChangeTag = (e, checkedTags) => {
    let filteredTags = [];
    if (checkedTags.length > 0) {
      filteredTags = checkedTags.filter((tag) => tag !== labels.tags);
      setSelectedTags(filteredTags);
      if (onChangeTags) {
        onChangeTags(e, filteredTags);
      }
    } else {
      filteredTags = [labels.tags];
      setSelectedTags(filteredTags);
      if (onChangeTags) {
        onChangeTags(e, []);
      }
    }
  };

  return (
    <Box py={5} ref={ref}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <SearchInput
            placeholder={labels?.search || "Search Database"}
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
          <StyledAutocomplete
            options={[labels.sort, ...sortOptions]}
            defaultValue={labels.sort}
            renderInput={(params) => (
              <StyledAutocompleteInput
                {...params}
                sx={{
                  "& .MuiInputBase-root": {
                    color: neutral[900],
                    typography: "p1",
                  },
                }}
              />
            )}
            onChange={handleChangeSort}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} overflow="hidden">
          <StyledAutocomplete
            multiple
            options={[labels.countries, ...countries]}
            defaultValue={[labels.countries]}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderOption={(renderProps, option, { selected }) => (
              <li {...renderProps}>
                <StyledCheckbox checked={selected} />
                {option.toUpperCase()}
              </li>
            )}
            renderTags={(checkedCountries, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps} typography="p1">
                {checkedCountries.length > 2
                  ? `${checkedCountries.length} ${labels.countries}`
                  : checkedCountries.join(", ")}
              </StyledAutocompleteTags>
            )}
            value={selectedCountries}
            onChange={handleChangeCountry}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <StyledAutocomplete
            multiple
            options={[labels.tags, ...tags]}
            defaultValue={[labels.tags]}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderOption={(renderProps, option, { selected }) => (
              <li {...renderProps}>
                <StyledCheckbox checked={selected} />
                {option.toUpperCase()}
              </li>
            )}
            value={selectedTags}
            onChange={handleChangeTag}
            renderTags={(checkedTags, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps} typography="p1">
                {checkedTags.length > 1
                  ? `${checkedTags.length} ${labels.tags}`
                  : checkedTags.join(", ")}
              </StyledAutocompleteTags>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
