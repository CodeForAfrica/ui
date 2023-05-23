import {
  Box,
  Grid,
  styled,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { neutral } from "@/charterafrica/colors";
import { ControlledSearchInput } from "@/charterafrica/components/SearchInput";

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
    onChangeQ,
    onChangeSort,
    onChangeCountries,
    onChangeTags,
    countries,
    labels,
    sortOptions,
    q,
    tags,
  } = props;

  const [selectedCountries, setSelectedCountries] = useState([
    labels.countries,
  ]);
  const [selectedTags, setSelectedTags] = useState([labels.tags]);

  const handleChangeQ = (e, value) => {
    if (onChangeQ) {
      onChangeQ(e, value);
    }
  };

  const handleChangeSort = (e, selectedSortOption) => {
    if (selectedSortOption?.value) {
      onChangeSort(e, selectedSortOption.value);
    } else {
      onChangeSort(e, "");
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

  const listToLabel = (list, label, num = 1) => {
    return list?.length > num
      ? `${list.length} ${labels[label]}`
      : list.join(", ");
  };

  return (
    <Box py={5} ref={ref}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <ControlledSearchInput
            onChange={handleChangeQ}
            placeholder={labels.search}
            value={q}
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
            defaultValue={labels.sort}
            options={[labels.sort, ...sortOptions]}
            onChange={handleChangeSort}
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
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} overflow="hidden">
          <StyledAutocomplete
            defaultValue={[labels.countries]}
            multiple
            options={[labels.countries, ...countries]}
            onChange={handleChangeCountry}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderTags={(checkedCountries, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps} typography="p1">
                {listToLabel(checkedCountries, "countries", 2)}
              </StyledAutocompleteTags>
            )}
            value={selectedCountries}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <StyledAutocomplete
            defaultValue={[labels.tags]}
            multiple
            options={[labels.tags, ...tags]}
            onChange={handleChangeTag}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderTags={(checkedTags, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps} typography="p1">
                {listToLabel(checkedTags, "tags")}
              </StyledAutocompleteTags>
            )}
            value={selectedTags}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
