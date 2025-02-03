import { AppBar, Hidden, Toolbar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
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

function Navigation({ navigation, ...props }) {
  const classes = useStyles(props);

  if (isEmpty(navigation)) {
    return null;
  }
  return (
    <AppBar color="primary" position="sticky" className={classes.root}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Hidden lgDown implementation="css">
          <DesktopNavigation
            navigation={navigation}
            classes={{ section: classes.section }}
          />
        </Hidden>
        <Hidden lgUp implementation="css">
          <MobileNavigation
            navigation={navigation}
            classes={{ section: classes.section }}
          />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Navigation.propTypes = {
  navigation: PropTypes.shape({}),
};

export default Navigation;
