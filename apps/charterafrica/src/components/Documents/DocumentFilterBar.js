import { Link } from "@commons-ui/next";
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

const DocumentFilterBar = React.forwardRef(function DocumentFilterBar(
  props,
  ref
) {
  const {
    datasets,
    labels,
    onChangeQ,
    onChangeSort,
    options: { search, sort: sortOptions },
    q,
    showDatasets,
    sort,
  } = props;

  const handleChangeQ = (e, value) => {
    if (onChangeQ) {
      onChangeQ(e, value);
    }
  };

  return (
    <Box py={5} ref={ref}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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
        {showDatasets ? (
          <Grid
            item
            xs={12}
            md={4}
            container
            justifyContent={{
              xs: "flex-start",
              md: "center",
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
              {labels.show}:
            </Typography>
            <Button
              color="primary"
              component={datasets?.href ? Link : undefined}
              href={datasets?.href}
              variant="contained"
              sx={(theme) => ({
                ...theme.typography.p1,
                width: "95px",
                borderRadius: "10px",
                color: showDatasets ? "#fff" : "neutral.dark",
              })}
            >
              {datasets?.label}
            </Button>
            <Button
              disabled
              variant="contained"
              sx={(theme) => ({
                ...theme.typography.p1,
                width: "95px",
                borderRadius: "10px",
                backgroundColor: neutral[50],
                color: "neutral.dark",
              })}
            >
              {labels.documents}
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
});

export default DocumentFilterBar;
