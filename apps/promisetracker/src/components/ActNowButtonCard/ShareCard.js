import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import useStyles from "./useStyles";

const ShareCard = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Grid container justify="center">
            <Typography variant="h4">Share</Typography>
          </Grid>
          <Grid className={classes.buttonContainer} container justify="center">
            <p>
              Help mobilise your community by sharing this promise on social
              media
            </p>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ShareCard;
