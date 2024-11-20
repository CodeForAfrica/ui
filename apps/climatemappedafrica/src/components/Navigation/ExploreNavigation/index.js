import { Grid, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useTour } from "@reactour/tour";
import PropTypes from "prop-types";
import React from "react";

import SearchIcon from "@/climatemappedafrica/assets/icons/search-explore.svg";
import DropdownSearch from "@/climatemappedafrica/components/DropdownSearch";
import NextImageButton from "@/climatemappedafrica/components/NextImageButton";

const useStyles = makeStyles(({ palette, typography }) => ({
  searchLabel: {
    display: "none",
  },
  searchInput: {
    borderRadius: 0,
    padding: `0 ${typography.pxToRem(10)}`,
    color: "#959696",
    textTransform: "initial",
    "&::placeholder": {
      opacity: 1,
    },
  },
  searchInputRoot: {
    borderRadius: 0,
    backgroundColor: palette.background.paper,
    borderColor: palette.background.default,
  },
  selectMenu: {
    borderRadius: 0,
    border: 0,
    background: palette.background.paper,
    marginTop: typography.pxToRem(2),
  },
  searchMenuItem: {
    "&:hover": {
      color: palette.text.secondary,
      background: palette.primary.main,
    },
  },
}));

function ExploreNavigation({
  explorePagePath,
  locations,
  logo,
  sx,
  tutorialEnabled,
  variant,
}) {
  const classes = useStyles();
  const { setIsOpen } = useTour();

  const openTooltip = () => {
    setIsOpen(true);
  };
  return (
    <Grid container alignItems="center" sx={sx}>
      <Grid item xs={3}>
        <NextImageButton
          {...logo}
          href="/"
          style={{
            height: 64,
            width: "auto",
          }}
          priority
        />
      </Grid>
      <Grid
        item
        xs={9}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <DropdownSearch
          icon={SearchIcon}
          href={explorePagePath}
          placeholder="Search for a Location"
          variant={variant}
          locations={locations}
          classes={{
            inputRoot: classes.searchInputRoot,
            input: classes.searchInput,
            label: classes.searchLabel,
            selectMenu: classes.selectMenu,
            menuItem: classes.searchMenuItem,
          }}
        />
        {tutorialEnabled && (
          <Button
            component="button"
            id="nav-help"
            onClick={openTooltip}
            sx={(theme) => ({
              color: "#666666",
              backgroundColor: "#EBEBEB",
              borderRadius: "50%",
              marginLeft: theme.typography.pxToRem(20),
              width: theme.typography.pxToRem(48),
              height: theme.typography.pxToRem(48),
              minWidth: theme.typography.pxToRem(48),
              cursor: "pointer",
            })}
          >
            ?
          </Button>
        )}
      </Grid>
      <Grid />
    </Grid>
  );
}

ExploreNavigation.propTypes = {
  logo: PropTypes.shape({}),
  variant: PropTypes.string,
};

export default ExploreNavigation;
