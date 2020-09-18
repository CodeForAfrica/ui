import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";

import info from "@/promisetracker/assets/hero-icon-info.png";
import viz2 from "@/promisetracker/assets/hero-icon-viz2.png";
import share from "@/promisetracker/assets/hero-icon-share.png";

const useStyles = makeStyles(() => ({
  iconGrid: {
    display: "flex",
    flexDirection: "row",
  },
}));

function ProfileDetails() {
  const classes = useStyles();
  return (
    <Grid container direction="row" item spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h1">Mike “Sonko” Mbuvi</Typography>
        <Typography variant="body2">
          Nairobi Governor Mike “Sonko” Mbuvi <b>510 promises </b>at a glance
        </Typography>
      </Grid>
      <Grid item xs={4} className={classes.iconGrid}>
        <IconButton aria-label="Viz2">
          <img src={viz2} alt="Viz2" />
        </IconButton>
        <IconButton aria-label="Info">
          <img src={info} alt="Info" />
        </IconButton>
        <IconButton ria-label="Share">
          <img src={share} alt="Share" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default ProfileDetails;
