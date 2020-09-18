import React from "react";

import logo from "@/promisetracker/assets/PT-logo-header-mob@2x.png";
import desktoplogo from "@/promisetracker/assets/PT-logo-header-desktop@2x.png";

import { useMediaQuery } from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@/promisetracker/components/Link/IconButton";

const useStyles = makeStyles(({ breakpoints }) => ({
  logo: {
    padding: "1rem",
    [breakpoints.up("md")]: {
      padding: 0,
    },
    "&:hover": {
      backgroundColor: "unset",
    },
  },
  img: {
    height: "auto",
    maxWidth: "8.5rem",
    [breakpoints.up("md")]: {
      maxWidth: "14.75rem",
      height: "auto",
    },
  },
}));

function Logo(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const src = isDesktop ? desktoplogo : logo;

  return (
    <IconButton
      disableRipple
      disableFocusRipple
      href="/"
      className={classes.logo}
    >
      <img src={src} alt="Promise Tracker Logo" className={classes.img} />
    </IconButton>
  );
}
export default Logo;
