import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Button, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useRef } from "react";

const useStyles = makeStyles(({ palette, typography }) => ({
  section: {},
  root: {
    backgroundColor: palette.background.paper,
    boxShadow: "0px 8px 30px #0000001A",
    width: "100%",
  },
  button: {
    width: "auto",
    fontWeight: "normal",
    color: "#909090",
    fontFamily: typography.fontFamily,
    padding: "1rem",
    borderBottom: "3px solid transparent",
    "&:hover": {
      borderRadius: 0,
      border: 0,
      color: palette.primary.dark,
      backgroundColor: "unset",
      borderBottom: `3px solid ${palette.primary.main}`,
    },
  },
  navigation: {
    padding: "0rem 10rem",
  },
  buttonCurrent: {
    borderRadius: 0,
    border: 0,
    color: palette.primary.dark,
    backgroundColor: "unset",
    borderBottom: `3px solid ${palette.primary.main}`,
  },
}));

function PageNavigation({
  navigation,
  pathname,
  asPath: asPathProp,
  ...props
}) {
  const classes = useStyles(props);
  const buttonRef = useRef();

  // Remove query from asPath (if any)
  const asPath = asPathProp && asPathProp.split("?")[0];
  const asPathParts = asPath && asPath.split("/");
  // Limit navigationUrl to subnav level only i.e. ignore article slug
  const navigationUrl =
    asPathParts && asPathParts.length > 2 && asPathParts.slice(0, 3).join("/");

  if (!navigation?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          className={classes.navigation}
        >
          {navigation.map((menu) => (
            <Grid item key={menu.href}>
              <Button
                component={Link}
                disableFocusRipple
                disableRipple
                href={pathname || menu.href}
                as={pathname ? menu.href : undefined}
                size="large"
                ref={buttonRef}
                className={clsx(classes.button, {
                  [classes.buttonCurrent]: menu.href.startsWith(navigationUrl),
                })}
              >
                {menu.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
}

PageNavigation.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  asPath: PropTypes.string,
  pathname: PropTypes.string,
};

export default PageNavigation;
