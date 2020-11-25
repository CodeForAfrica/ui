import React from "react";

import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import profilePic from "@/promisetracker/assets/hero-sonko.png";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    paddingTop: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      paddingTop: 0,
      marginLeft: typography.pxToRem(-55),
    },
  },
  caption: {
    color: "#20202059",
  },
  details: {
    paddingLeft: typography.pxToRem(10),
    [breakpoints.up("lg")]: {
      paddingLeft: 0,
    },
  },
  img: {
    maxWidth: typography.pxToRem(149),
    objectFit: "cover",
    width: typography.pxToRem(149),
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(350),
      width: typography.pxToRem(350),
    },
  },
  title: {
    color: palette.primary.main,
    textTransform: "uppercase",
  },
  typography: {
    textAlign: "center",
  },
}));

function Profile({ title, name, date, dateLabel, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item lg={12}>
        <img src={profilePic} alt={name} className={classes.img} />
      </Grid>
      <Grid item xs={6} lg={12} className={classes.details}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h6" className={classes.caption}>
          {dateLabel} {date}
        </Typography>
      </Grid>
    </Grid>
  );
}

Profile.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default Profile;
