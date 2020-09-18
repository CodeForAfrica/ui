import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import profilePic from "@/promisetracker/assets/hero-sonko.png";

const useStyles = makeStyles(({ widths }) => ({
  root: {
    width: widths.values.lg,
  },
  caption: {
    color: "#20202059",
  },
}));

function Profile() {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={4}>
      <img src={profilePic} alt="Profile" />
      <div>
        <Typography variant="h5">
          Campaign promises made by Mike Mbuvi
        </Typography>
        <Typography variant="h6" className={classes.caption}>
          Updated June 16, 2020
        </Typography>
      </div>
    </Grid>
  );
}

export default Profile;
