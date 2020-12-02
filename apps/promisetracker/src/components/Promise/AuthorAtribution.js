import React from "react";
import PropTypes from "prop-types";

import { Typography, Hidden, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography, palette, breakpoints }) => ({
  root: {
    display: "flex",
    alignItems: "start",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: palette.secondary.light,
    [breakpoints.up("lg")]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2rem",
    },
  },
  dateReadTime: {
    color: palette.secondary.main,
  },
  mobileDescription: {
    marginTop: "1rem",
  },
  title: {
    marginBottom: "3rem",
    [breakpoints.up("lg")]: {
      marginBottom: "1rem",
    },
  },
  titleDescriptionContainer: {
    width: typography.pxToRem(308),
  },
  image: {
    borderRadius: "50%",
    alignSelf: "center",
    width: typography.pxToRem(184),
    height: typography.pxToRem(184),
    background: (props) => (props.image ? `url(${props.image})` : "#fff"),
    [breakpoints.up("lg")]: {
      marginLeft: "1rem",
    },
  },
  name: {},
}));
function AuthorAtribution({
  title,
  description,
  image,
  mobileTitle,
  classes: classesProp,
}) {
  const classes = useStyles({ image, classes: classesProp });
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div className={classes.root}>
      <div className={classes.titleDescriptionContainer}>
        <Typography className={classes.title} variant="h4">
          {isDesktop ? title : mobileTitle}
        </Typography>
        <Hidden mdDown>
          <Typography className={classes.description} variant="body1">
            {description}
          </Typography>
        </Hidden>
      </div>
      <div className={classes.image} />
      <Hidden lgUp>
        <Typography className={classes.mobileDescription} variant="body2">
          {description}
        </Typography>
      </Hidden>
    </div>
  );
}

AuthorAtribution.propTypes = {
  classes: PropTypes.shape({
    description: PropTypes.string,
    titleDescriptionContainer: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    mobileDescription: PropTypes.string,
    root: PropTypes.string,
  }),
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  mobileTitle: PropTypes.string,
};

AuthorAtribution.defaultProps = {
  classes: undefined,
  title: "Author Attribution",
  mobileTitle: "Data source embed",
  description:
    "Intro text explaining why the user is seeing this chart here and where does it come from.",
  image: "",
};

export default AuthorAtribution;
