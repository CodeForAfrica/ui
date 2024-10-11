import LogoButton from "@commons-ui/core/LogoButton";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/climatemappedafrica/components/Link";
import Section from "@/climatemappedafrica/components/Section";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: {},
  logoButton: {
    padding: 0,
  },
  section: {},
  dialog: {
    padding: 0,
  },
  firstTitle: {
    color: palette.background.default,
    fontWeight: "normal",
    [breakpoints.up("lg")]: {
      fontWeight: "bold",
    },
  },
  secondTitle: {
    color: palette.background.default,
  },
  subtitle: {
    color: palette.background.default,
  },
  logoSection: {
    borderBottom: `2px solid ${palette.background.default}`,
    padding: `${typography.pxToRem(10)} 0`,
  },
  backdrop: {
    backgroundColor: "transparent",
    maxHeight: typography.pxToRem(844),
  },
  dialogActions: {
    padding: 0,
  },
  dialogContent: {
    overflow: "hidden",
    padding: `${typography.pxToRem(40)} 0`,
  },
  dialogMenu: {
    padding: `${typography.pxToRem(10.35)} 0`,
  },
  dialogPaper: {
    background: palette.primary.main,
    maxHeight: typography.pxToRem(844),
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  menuButton: {
    color: palette.grey.dark,
    background: "#F0F0F0",
    borderRadius: typography.pxToRem(50),
    height: typography.pxToRem(34),
    padding: 0,
    width: typography.pxToRem(34),
    "&:hover": {
      background: "#F0F0F0",
      borderRadius: typography.pxToRem(50),
    },
  },
  closeButton: {
    color: palette.background.main,
    height: typography.pxToRem(34),
    padding: 0,
    width: typography.pxToRem(34),
    "&:hover": {
      background: "none",
    },
  },
  menuItems: {
    padding: `${typography.pxToRem(20)} 0 ${typography.pxToRem(71)}`,
  },
  button: {
    color: palette.background.dark,
    padding: typography.pxToRem(16),
  },
  open: {
    fontSize: typography.pxToRem(32),
  },
  close: {
    color: palette.background.default,
    fontSize: typography.pxToRem(32),
  },
  label: {
    [breakpoints.up("lg")]: {
      fontWeight: 600,
      letterSpacing: "1.6px",
      fontSize: typography.pxToRem(20),
    },
  },
  buttonMenu: {
    margin: 0,
  },
  menuLinks: {
    color: palette.text.secondary,
    margin: `${typography.pxToRem(10)} ${typography.pxToRem(-8)}`,
    "&:hover, &:focus, &:focus-within": {
      backgroundColor: "transparent",
      textDecoration: "none",
      color: palette.text.secondary,
    },
  },
  mainMenu: {
    [breakpoints.up("lg")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
      "& > div:nth-of-type(2)": {
        order: 4,
      },
      "& > div:nth-of-type(3)": {
        order: 5,
      },
      "& > div:nth-of-type(4)": {
        order: 3,
      },
      "& > div:nth-of-type(5)": {
        order: 2,
      },
      "& > div:nth-of-type(6)": {
        order: 5,
      },
    },
  },
  search: {
    margin: `${typography.pxToRem(20)} 0 ${typography.pxToRem(60)}`,
  },
  searchInput: {
    border: `2px solid ${palette.background.default}`,
    backgroundColor: palette.background.default,
  },
}));

function MobileNavigation({ logo, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item container justifyContent="center">
            <LogoButton
              href="/"
              component={Link}
              className={classes.logoButton}
            >
              <Image {...logo} width={180} height={70} />
            </LogoButton>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

MobileNavigation.propTypes = {
  logoProps: PropTypes.shape({}),
  menuProps: PropTypes.arrayOf(PropTypes.shape({})),
  mobileLogoProps: PropTypes.shape({
    alt: PropTypes.string,
    href: PropTypes.string,
    src: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MobileNavigation;
