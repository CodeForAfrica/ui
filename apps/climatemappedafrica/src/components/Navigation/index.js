import { AppBar, Toolbar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavigation from "./DesktopNavigation";
import ExploreNavigation from "./ExploreNavigation";
import MobileNavigation from "./MobileNavigation";

import Section from "@/climatemappedafrica/components/Section";

const useStyles = makeStyles(
  ({ palette, typography, zIndex, breakpoints }) => ({
    root: {
      backgroundColor: palette.background.default,
      zIndex: zIndex.modal,
    },
    section: {},
    toolbar: {
      display: "flex",
      alignItems: "center",
      padding: `0`,
      [breakpoints.up("lg")]: {
        padding: `${typography.pxToRem(12)} 0`,
      },
    },
    navigation: {
      flexGrow: 1,
    },
  }),
);

function Navigation({ variant, ...props }) {
  const classes = useStyles(props);

  return (
    <AppBar color="inherit" position="sticky" className={classes.root}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Section>
          {variant?.toLowerCase() === "explore" ? (
            <ExploreNavigation
              variant={variant}
              {...props}
              classes={{ section: classes.section }}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
                width: "100%",
              }}
            />
          ) : (
            <DesktopNavigation
              {...props}
              classes={{ section: classes.section }}
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
                width: "100%",
              }}
            />
          )}
          <MobileNavigation
            {...props}
            sx={{
              display: {
                xs: "flex",
                lg: "none",
              },
              width: "100%",
            }}
          />
        </Section>
      </Toolbar>
    </AppBar>
  );
}

Navigation.propTypes = {
  variant: PropTypes.string,
};

export default Navigation;
