import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useTour } from "@reactour/tour";
import PropTypes from "prop-types";
import React from "react";

import SearchIcon from "@/climatemappedafrica/assets/icons/search-explore.svg";
import DropdownSearch from "@/climatemappedafrica/components/DropdownSearch";
import NextImageButton from "@/climatemappedafrica/components/NextImageButton";
import Section from "@/climatemappedafrica/components/Section";

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
  tutorialEnabled,
  variant,
}) {
  const classes = useStyles();
  const { setIsOpen } = useTour();

  const openTooltip = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <Section>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <NextImageButton
              href="/"
              {...logo}
              width={200}
              height={100}
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
              <Typography
                component="div"
                id="nav-help"
                onClick={openTooltip}
                variant="h3"
                sx={(theme) => ({
                  color: "#666666",
                  textAlign: "center",
                  backgroundColor: "#EBEBEB",
                  borderRadius: theme.typography.pxToRem(60),
                  marginLeft: theme.typography.pxToRem(20),
                  width: theme.typography.pxToRem(48),
                  height: theme.typography.pxToRem(48),
                  cursor: "pointer",
                })}
              >
                ?
              </Typography>
            )}
          </Grid>
          <Grid />
        </Grid>
      </Section>
    </div>
  );
}

ExploreNavigation.propTypes = {
  logo: PropTypes.shape({}),
  variant: PropTypes.string,
};

export default ExploreNavigation;
