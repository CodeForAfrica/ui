import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import useStyles from "./useStyles";

const ConnectCard = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Grid container justify="center">
            <Typography variant="h4">Connect!</Typography>
          </Grid>
          <Grid className={classes.buttonContainer} container justify="center">
            <p>Align with others</p>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ConnectCard;
