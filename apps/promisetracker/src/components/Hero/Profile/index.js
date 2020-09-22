import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import profilePic from "@/promisetracker/assets/hero-sonko.png";

const useStyles = makeStyles(({ breakpoints, palette, widths }) => ({
  root: {
    width: widths.values.lg,
  },
  caption: {
    color: "#20202059",
  },
  img: {
    width: "149px",
    height: "149px",
    [breakpoints.up("md")]: {
      width: "100%",
      height: "auto",
    },
  },
  subtitle: {
    color: palette.primary.main,
    textTransform: "uppercase",
  },
}));

function Profile(props) {
  const classes = useStyles(props);
  return (
    <Grid container direction="row" alignItems="center" item xs={12} md={4}>
      <Grid item xs={6} md={12}>
        <img src={profilePic} alt="Profile" className={classes.img} />
      </Grid>
      <Grid item xs={6} md={12}>
        <Typography variant="h5" className={classes.subtitle}>
          Campaign promises made by Mike Mbuvi
        </Typography>
        <Typography variant="h6" className={classes.caption}>
          Updated June 16, 2020
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Profile;
