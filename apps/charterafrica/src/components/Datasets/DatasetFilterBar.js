import { Box, Grid, styled, TextField, Typography } from "@mui/material";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import ComboBox from "@/charterafrica/components/ComboBox";
import { ControlledSearchInput } from "@/charterafrica/components/SearchInput";

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
    selectedCountries,
    countriesList,
    onChangeQ,
    onChangeSort,
    onChangeCountries,
    onChangeTags,
    options: {
      countries: countriesOptions,
      search,
      sort: sortOptions,
      tags: tagsOptions,
    },
    sort,
    q,
    selectedTags,
    tagsList,
  } = props;

  const handleChangeQ = (e, value) => {
    if (onChangeQ) {
      onChangeQ(e, value);
    }
  };

  const listToLabel = (list, label, num = 1) => {
    return list?.length > num
      ? `${list.length} ${label}`
      : list.map((l) => l.label || l).join(", ");
  };

  return (
    <Box py={5} ref={ref}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <ControlledSearchInput
            onChange={handleChangeQ}
            placeholder={search.label}
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
          <ComboBox
            label={sortOptions.label}
            options={sortOptions.options}
            onChange={onChangeSort}
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
            value={sort}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} overflow="hidden">
          <ComboBox
            label={countriesOptions.label}
            multiple
            options={countriesList}
            onChange={onChangeCountries}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderTags={(checkedCountries, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps} typography="p1">
                {listToLabel(checkedCountries, countriesOptions.label)}
              </StyledAutocompleteTags>
            )}
            value={selectedCountries}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <ComboBox
            label={tagsOptions.label}
            multiple
            options={tagsList}
            onChange={onChangeTags}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderTags={(checkedTags, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps} typography="p1">
                {listToLabel(checkedTags, tagsOptions.label)}
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
