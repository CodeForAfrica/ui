import { AppBar, Hidden, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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
    display: "block",
    [breakpoints.up("lg")]: {
      height: "auto",
    },
  },
}));

function Navigation(props) {
  const classes = useStyles(props);

  return (
    <AppBar color="primary" position="sticky" className={classes.root}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Hidden mdDown implementation="css">
          <DesktopNavigation classes={{ section: classes.section }} />
        </Hidden>
        <Hidden lgUp implementation="css">
          <MobileNavigation classes={{ section: classes.section }} />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
