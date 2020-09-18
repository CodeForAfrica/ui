import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

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
      <Grid item xs={4} className={classes.iconGrid} />
    </Grid>
  );
}

export default ProfileDetails;
