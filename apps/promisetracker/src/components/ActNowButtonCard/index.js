import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";

import useStyles from "./useStyles";

const ActNowButtonCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="center">
          <Typography variant="h4">Act Now!</Typography>
        </Grid>
        <Grid
          className={classes.buttonContainer}
          container
          justify="space-between"
        >
          <Button className={classes.button} variant="contained">
            Connect
          </Button>
          <Button className={classes.button} variant="contained">
            Petition
          </Button>
          <Button className={classes.button} variant="contained">
            Follow
          </Button>
          <Button className={classes.button} variant="contained">
            Update
          </Button>
          <Button className={classes.button} variant="contained">
            Share
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ActNowButtonCard;
