import LogoButton from "@commons-ui/core/LogoButton";
import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useTour } from "@reactour/tour";
import PropTypes from "prop-types";
import React from "react";

import SearchIcon from "@/climatemappedafrica/assets/icons/search-explore.svg";
import DropdownSearch from "@/climatemappedafrica/components/DropdownSearch";
import Image from "@/climatemappedafrica/components/Image";
import Link from "@/climatemappedafrica/components/Link";
import Section from "@/climatemappedafrica/components/Section";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  section: {},
  logoButton: {
    padding: 0,
  },
  help: {
    color: "#666666",
    textAlign: "center",
    backgroundColor: "#EBEBEB",
    borderRadius: typography.pxToRem(60),
    marginLeft: typography.pxToRem(20),
    width: typography.pxToRem(48),
    height: typography.pxToRem(48),
    cursor: "pointer",
  },
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

function ExploreNavigation({ logo, variant }) {
  const classes = useStyles({});
  const { setIsOpen } = useTour();

  const openTooltip = () => {
    setIsOpen(true);
  };
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <LogoButton
              href="/"
              component={Link}
              className={classes.logoButton}
            >
              <Image {...logo} width={200} height={80} />
            </LogoButton>
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
              placeholder="Search for a Location" // TODO: Read from cms
              variant={variant}
              classes={{
                inputRoot: classes.searchInputRoot,
                input: classes.searchInput,
                label: classes.searchLabel,
                selectMenu: classes.selectMenu,
                menuItem: classes.searchMenuItem,
              }}
            />
            <Typography
              component="div"
              id="nav-help"
              onClick={openTooltip}
              variant="h3"
              className={classes.help}
            >
              ?
            </Typography>
          </Grid>
          <Grid />
        </Grid>
      </Section>
    </div>
  );
}

ExploreNavigation.propTypes = {
  logoProps: PropTypes.shape({}),
  menuProps: PropTypes.arrayOf(PropTypes.shape({})),
  onOpenHelp: PropTypes.func,
  socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
  desktopLogoProps: PropTypes.shape({
    alt: PropTypes.string,
    href: PropTypes.string,
    src: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  mobileLogoProps: PropTypes.shape({
    alt: PropTypes.string,
    href: PropTypes.string,
    src: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  }),
};

export default ExploreNavigation;
