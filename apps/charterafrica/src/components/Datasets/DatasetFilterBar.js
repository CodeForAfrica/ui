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
    countries,
    countriesOptions,
    onChangeQ,
    onChangeSort,
    onChangeCountries,
    onChangeTags,
    labels,
    sortOptions,
    sort,
    q,
    tags,
    tagsOptions,
  } = props;

  const handleChangeQ = (e, value) => {
    if (onChangeQ) {
      onChangeQ(e, value);
    }
  };

  const listToLabel = (list, label, num = 1) => {
    return list?.length > num
      ? `${list.length} ${labels[label]}`
      : list.map((l) => l.label || l).join(", ");
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
          <ComboBox
            label={labels.sort}
            options={sortOptions}
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
            label={labels.countries}
            multiple
            options={countriesOptions}
            onChange={onChangeCountries}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderTags={(checkedCountries, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps} typography="p1">
                {listToLabel(checkedCountries, "countries", 2)}
              </StyledAutocompleteTags>
            )}
            value={countries}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <ComboBox
            label={labels.tags}
            multiple
            options={tagsOptions}
            onChange={onChangeTags}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderTags={(checkedTags, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps} typography="p1">
                {listToLabel(checkedTags, "tags")}
              </StyledAutocompleteTags>
            )}
            value={tags}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
