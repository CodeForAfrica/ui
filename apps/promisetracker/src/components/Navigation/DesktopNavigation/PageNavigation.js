import React, { useRef } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";

import LinkButton from "@/promisetracker/components/Link/Button";

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
          justify="space-between"
          className={classes.navigation}
        >
          {navigation.map((menu) => (
            <Grid item key={menu.href}>
              <LinkButton
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
                {menu.name}
              </LinkButton>
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
}

PageNavigation.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  asPath: PropTypes.string,
  pathname: PropTypes.string,
};

PageNavigation.defaultProps = {
  pathname: undefined,
  asPath: undefined,
};

export default PageNavigation;
