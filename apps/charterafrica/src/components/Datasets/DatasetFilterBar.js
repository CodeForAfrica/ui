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
    countries,
    countriesOptions,
    dataToDisplay,
    onChangeQ,
    onChangeSort,
    onChangeCountries,
    onChangeTags,
    onChangeDataToDisplay,
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
      <Grid container spacing={1}>
        <Grid item xs={12} lg={2.4}>
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
        <Grid item xs={12} sm={4} md={3} lg={2.4}>
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
        <Grid item xs={12} sm={4} md={3} lg={2.4} overflow="hidden">
          <ComboBox
            label={labels.countries}
            multiple
            options={countriesOptions}
            onChange={onChangeCountries}
            renderInput={(params) => <StyledAutocompleteInput {...params} />}
            renderTags={(checkedCountries, getTagProps) => (
              <StyledAutocompleteTags {...getTagProps} typography="p1">
                {listToLabel(checkedCountries, "countries")}
              </StyledAutocompleteTags>
            )}
            value={countries}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={2.4}>
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
              backgroundColor:
                dataToDisplay === "datasets" ? "primary" : neutral[50],
              color: dataToDisplay === "datasets" ? "#fff" : "neutral.dark",
            }}
            onClick={() => onChangeDataToDisplay("datasets")}
          >
            <Typography typography="p1">Datasets</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "95px",
              borderRadius: "10px",
              backgroundColor:
                dataToDisplay === "documents" ? "primary" : neutral[50],
              color: dataToDisplay === "documents" ? "#fff" : "neutral.dark",
            }}
            onClick={() => onChangeDataToDisplay("documents")}
          >
            <Typography typography="p1">Documents</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
