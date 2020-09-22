import React from "react";

import { AppBar, Toolbar, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

const useStyles = makeStyles(({ breakpoints, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    boxShadow: "0px 10px 40px #0000002E;",
    [breakpoints.up("lg")]: {
      boxShadow: "0px 8px 30px #0000001A;",
    },
  },
  section: {},
  toolbar: {
    [breakpoints.up("lg")]: {
      height: "auto",
    },
  },
}));

function Navigation(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <AppBar color="primary" position="sticky" className={classes.root}>
        <Toolbar disableGutters className={classes.toolbar}>
          {isDesktop ? (
            <DesktopNavigation classes={{ section: classes.section }} />
          ) : (
            <MobileNavigation classes={{ section: classes.section }} />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;
