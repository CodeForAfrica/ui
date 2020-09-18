import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "@/promisetracker/components/Hero/Profile";

const useStyles = makeStyles(() => ({
  root: {},
}));
function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Profile />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">Example 2</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Hero;
