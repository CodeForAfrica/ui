import {
  Box,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
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
    documentsHref,
    showDocuments,
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
      <Grid container spacing={1}>
        <Grid item xs={12} lg={2.4}>
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
        <Grid item xs={12} sm={4} md={3} lg={2.4}>
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
        <Grid item xs={12} sm={4} md={3} lg={2.4} overflow="hidden">
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
        <Grid item xs={12} sm={4} md={3} lg={2.4}>
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
        {showDocuments ? (
          <Grid
            item
            xs={12}
            md={3}
            lg={2.4}
            container
            justifyContent={{
              xs: "flex-start",
              md: "space-between",
            }}
            gap={1}
            alignItems="center"
            direction="row"
            wrap="nowrap"
          >
            <Typography
              typography="p1"
              color="neutral.dark"
              sx={{
                mr: 1,
              }}
            >
              Show:
            </Typography>

            <Button
              variant="contained"
              sx={{
                width: "95px",
                borderRadius: "10px",
                backgroundColor: showDocuments ? neutral[50] : "primary",
                color: showDocuments ? "neutral.dark" : "#fff",
              }}
              component="a"
              disabled={!showDocuments}
            >
              <Typography typography="p1">Datasets</Typography>
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "95px",
                borderRadius: "10px",
                backgroundColor: showDocuments ? "primary" : neutral[50],
                color: showDocuments ? "#fff" : "neutral.dark",
              }}
              component="a"
              href={documentsHref}
            >
              <Typography typography="p1">Documents</Typography>
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
