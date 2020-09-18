import React, { useRef } from "react";
import PropTypes from "prop-types";

import { useRouter } from "next/router";

import clsx from "clsx";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LinkButton from "@/promisetracker/components/Link/Button";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    width: "100%",
    backgroundColor: palette.background.paper,
    boxShadow: "0px 8px 30px #0000001A",
  },
  button: {
    width: "auto",
    fontWeight: "normal",
    color: "#909090",
    textTransform: "uppercase",
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
}));

function PageNavigation({ navigation, ...props }) {
  const classes = useStyles(props);
  const router = useRouter();
  const buttonRef = useRef();
  const className = clsx(classes.button);

  return (
    <div className={classes.root}>
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
              href={router.pathname || menu.href}
              as={router.pathname ? menu.href : undefined}
              size="large"
              ref={buttonRef}
              className={className}
            >
              {menu.name}
            </LinkButton>
          </Grid>
        ))}
      </Grid>
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
};

export default PageNavigation;
