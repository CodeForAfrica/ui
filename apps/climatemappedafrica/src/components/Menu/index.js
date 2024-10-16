import { StayInTouch } from "@commons-ui/next";
import { Grid, Button, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/climatemappedafrica/components/Link";

const useStyles = makeStyles(({ typography, breakpoints, palette }) => ({
  root: {
    display: "flex",
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
    [breakpoints.up("lg")]: {
      padding: 0,
      flexDirection: "row",
      justifyContent: "flex-end",
      "& > div:nth-of-type(2)": {
        order: 0,
      },
      "& > div:nth-of-type(3)": {
        order: 0,
      },
      "& > div:nth-of-type(4)": {
        order: 0,
      },
      "& > div:nth-of-type(5)": {
        order: 0,
      },
      "& > div:nth-of-type(6)": {
        order: 0,
      },
    },
  },
  links: {
    padding: `${typography.pxToRem(14)} ${typography.pxToRem(28)} `,
  },
  label: {
    fontWeight: 600,
    letterSpacing: "1.6px",
    fontSize: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      fontSize: typography.pxToRem(16),
    },
    textTransform: "uppercase",
  },
  menu: {
    margin: 0,
    [breakpoints.up("lg")]: {
      margin: `0 ${typography.pxToRem(12.8)}`,
    },
  },
  text: {
    "&::after": {
      content: '""',
      backgroundImage: "none",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      marginLeft: 0,
      height: 0,
      width: 0,
    },
    "&:hover::after": {
      content: '""',
      backgroundImage: "none",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transition: "margin 0.3s ease",
      marginLeft: 0,
      height: 0,
      width: 0,
    },
  },
  menuLinks: {
    color: palette.text.secondary,
    margin: `${typography.pxToRem(10)} ${typography.pxToRem(-8)}`,
    "&:hover, &:focus, &:focus-within": {
      backgroundColor: "transparent",
      textDecoration: "none",
      color: palette.text.secondary,
    },
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(7)} ${typography.pxToRem(18)}`,
      color: palette.grey.dark,
      "&:hover, &:focus, &:focus-within": {
        color: "#707070",
        backgroundColor: "transparent",
        textDecoration: "none",
      },
    },
  },
}));

function Menu({ links, children, socialLinks, ...props }) {
  const classes = useStyles(props);

  if (!links?.length) {
    return null;
  }
  return (
    <Grid container className={classes.root}>
      {links.map((item, index) => (
        <Grid item key={item.label} className={classes.menu}>
          <Button
            component={Link}
            color={index !== 0 ? "secondary" : "primary"}
            variant={index !== 0 ? "text" : "outlined"}
            size="large"
            href={item.href}
            classes={{
              root: index !== 0 ? classes.menuLinks : classes.links,
              text: classes.text,
            }}
            sx={(theme) => ({
              borderRadius: 20,
              border: index !== 0 ? 0 : "3px solid",
              color: {
                xs: theme.palette.text.secondary,
                lg: theme.palette.primary.main,
              },
            })}
          >
            <Typography variant="body1" className={classes.label}>
              {item.label}
            </Typography>
          </Button>
        </Grid>
      ))}
      {children}
      <StayInTouch
        links={socialLinks}
        LinkProps={{
          component: Link,
          sx: {
            color: "text.primary",
            backgroundColor: "#EBEBEB",
            borderRadius: 50,
            width: 42,
            height: 42,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "3.2px",
          },
        }}
        alignItems="flex-start"
      />
    </Grid>
  );
}

Menu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
      component: PropTypes.func,
    }),
  ),
  children: PropTypes.node,
};

export default Menu;
