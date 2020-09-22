import React from "react";

import logo from "@/promisetracker/assets/PT-logo-header-mob@2x.png";
import desktoplogo from "@/promisetracker/assets/PT-logo-header-desktop@2x.png";

import { useMediaQuery } from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@/promisetracker/components/Link/IconButton";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  logo: {
    padding: 0,
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  img: {
    height: "auto",
    maxWidth: typography.pxToRem(135),
    minWidth: typography.pxToRem(135),
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(236),
      minWidth: typography.pxToRem(236),
    },
  },
}));

function Logo(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const src = isDesktop ? desktoplogo : logo;

  return (
    <IconButton
      disableRipple
      disableFocusRipple
      href="/"
      className={classes.logo}
    >
      <img src={src} alt="Promise Tracker" className={classes.img} />
    </IconButton>
  );
}
export default Logo;
