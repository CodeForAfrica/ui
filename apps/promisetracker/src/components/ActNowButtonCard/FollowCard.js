import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import useStyles from "./useStyles";

const FollowCard = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Grid container justify="center">
            <Typography variant="h4">Follow</Typography>
          </Grid>
          <Grid className={classes.buttonContainer} container justify="center">
            <p>Get alerts whenever there is a development on the promise</p>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default FollowCard;
