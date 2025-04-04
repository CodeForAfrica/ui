import { Typography, Hidden, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

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
    background: (props) => (props.image ? `url("${props.image}")` : "#fff"),
    [breakpoints.up("lg")]: {
      marginLeft: "1rem",
    },
  },
  name: {},
}));
function AuthorAtribution({
  title = "Author Attribution",
  description = "Intro text explaining why the user is seeing this chart here and where does it come from.",
  image = "",
  mobileTitle = "Data source embed",
  classes: classesProp,
}) {
  const classes = useStyles({ image, classes: classesProp });
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (!(title || description)) {
    return null;
  }
  return (
    <div className={classes.root}>
      <div className={classes.titleDescriptionContainer}>
        <Typography className={classes.title} variant="h4">
          {isDesktop ? title : mobileTitle}
        </Typography>
        <Hidden lgDown>
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

export default AuthorAtribution;
