import { Link } from "@commons-ui/next";
import { IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Image from "next/image";
import React from "react";

import desktoplogo from "@/promisetracker/assets/PT-logo-header-desktop@2x.png";
import logo from "@/promisetracker/assets/PT-logo-header-mob@2x.png";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  logo: {
    maxWidth: typography.pxToRem(135),
    minWidth: typography.pxToRem(135),
    padding: 0,
    "&:hover": {
      backgroundColor: "inherit",
    },
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(236),
      minWidth: typography.pxToRem(236),
    },
  },
  img: {},
}));

function Logo(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const src = isDesktop ? desktoplogo : logo;
  const width = isDesktop ? 236 : 135;
  const height = isDesktop ? 31 : 17;

  return (
    <IconButton
      component={Link}
      disableRipple
      disableFocusRipple
      href="/"
      className={classes.logo}
      size="large"
    >
      <Image
        src={src}
        alt="PromiseTracker"
        className={classes.img}
        width={width}
        height={height}
      />
    </IconButton>
  );
}
export default Logo;
