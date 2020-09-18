import React from "react";

import { AppBar, Toolbar, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DesktopNavigation from "@/promisetracker/components/Navigation/DesktopNavigation";
import MobileNavigation from "@/promisetracker/components/Navigation/MobileNavigation";

const useStyles = makeStyles(({ breakpoints, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    boxShadow: "0px 8px 30px #0000001A",
    [breakpoints.up("md")]: {
      boxShadow: "0px 8px 30px #0000001A",
    },
  },
  toolbar: {
    height: "100%",
    [breakpoints.up("md")]: {
      height: "auto",
    },
  },
}));

function Navigation() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <AppBar color="primary" position="sticky" className={classes.root}>
        <Toolbar disableGutters className={classes.toolbar}>
          {isDesktop ? <DesktopNavigation /> : <MobileNavigation />}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;
