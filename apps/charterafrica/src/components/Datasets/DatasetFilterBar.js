import {
  Box,
  Grid,
  Select,
  MenuItem,
  Chip,
  Typography,
  Checkbox,
  ListItemText,
  styled,
} from "@mui/material";
import React, { useState } from "react";

import { neutral } from "@/charterafrica/colors";
import SearchInput from "@/charterafrica/components/SearchInput";
import {
  DEFAULT_SORTING,
  DEFAULT_COUNTRY,
  DEFAULT_TAG,
} from "@/charterafrica/utils/datasets/queryString";

const StyledSelect = styled(Select)({
  backgroundColor: neutral[50],
  height: "36px",
  typography: "p1",
  overflow: "hidden",
  width: "200px",
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
  } = props;

  const [value, setValue] = useState(searchProp || "");
  const [sort, setSort] = useState(DEFAULT_SORTING);
  const [country, setCountry] = useState([DEFAULT_COUNTRY]);
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

  const handleChangeCountry = (e) => {
    const {
      target: { value: checkedCountries },
    } = e;

    if (checkedCountries.length > 1) {
      const selectedCountries = checkedCountries.filter(
        (c) => c !== DEFAULT_COUNTRY
      );
      setCountry(selectedCountries);
    } else {
      setCountry([DEFAULT_COUNTRY]);
    }

    if (onChangeCountries) {
      onChangeCountries(e, checkedCountries);
    }
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

  const sortOrder = [
    {
      label: "Most Recent",
      value: "metadata_modified desc",
    },
    {
      label: "Least Recent",
      value: "metadata_modified asc",
    },
    {
      label: "Name (A-Z)",
      value: "name asc",
    },
    {
      label: "Name (Z-A)",
      value: "name desc",
    },
  ];

  return (
    <Box py={5} ref={ref}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2.4}>
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
              width: "200px",
            }}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <StyledSelect
            onChange={handleChangeSort}
            MenuProps={menuProps}
            value={sort}
          >
            {sortOrder.map((order) => (
              <StyledMenuItem value={order.value} key={order.value}>
                {order.label}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </Grid>
        <Grid item xs={12} md={2.4} overflow="hidden">
          <StyledSelect
            multiple
            renderValue={(selected) => selected.join(", ")}
            onChange={handleChangeCountry}
            MenuProps={menuProps}
            value={country}
          >
            <MenuItem value={DEFAULT_COUNTRY} key={DEFAULT_COUNTRY}>
              {DEFAULT_COUNTRY}
            </MenuItem>
            {countries.map((singleCountry) => (
              <StyledMenuItem value={singleCountry} key={singleCountry}>
                <StyledCheckbox checked={country.indexOf(singleCountry) > -1} />
                <ListItemText primary={singleCountry} />
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </Grid>
        <Grid item xs={12} md={2.4}>
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
                <ListItemText primary={singleTag} />
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="p1" color="neutral.main" pr={2}>
            Show:
          </Typography>
          <Chip
            label="Documents"
            sx={(theme) => ({
              backgroundColor: theme.palette.success.main,
              ...theme.typography.caption,
              borderRadius: "10px",
              mr: 1.75,
            })}
          />
          <Chip
            label="Datasets"
            sx={(theme) => ({
              backgroundColor: theme.palette.error.main,
              ...theme.typography.caption,
              borderRadius: "10px",
              mr: 1.75,
            })}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default DatasetFilterBar;
