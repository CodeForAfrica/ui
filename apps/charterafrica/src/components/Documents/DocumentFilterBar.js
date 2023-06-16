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
    onChangeQ,
    onChangeSort,
    options: { search, sort: sortOptions },
    sort,
    q,
    datasetsHref,
    showDatasets,
  } = props;

  const handleChangeQ = (e, value) => {
    if (onChangeQ) {
      onChangeQ(e, value);
    }
  };

  return (
    <Box py={5} ref={ref}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs={12} md={3}>
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
        <Grid item xs={12} md={3}>
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
            md={3}
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
                backgroundColor: showDatasets ? neutral[50] : "primary",
                color: showDatasets ? "neutral.dark" : "#fff",
              }}
              component="a"
              disabled={!showDatasets}
            >
              <Typography typography="p1">Documents</Typography>
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "95px",
                borderRadius: "10px",
                backgroundColor: showDatasets ? "primary" : neutral[50],
                color: showDatasets ? "#fff" : "neutral.dark",
              }}
              component="a"
              href={datasetsHref}
            >
              <Typography typography="p1">Datasets</Typography>
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
});

export default DocumentFilterBar;
