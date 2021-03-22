import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";
// import ConnectCard from "./ConnectCard";
// import PetitionCard from "./PetitionCard";

import useStyles from "./useStyles";

const ActNowButtonCard = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Grid container justify="center">
            <Typography className={classes.cardTitle} variant="h4">
              Act Now!
            </Typography>
          </Grid>
          <Grid className={classes.buttonContainer} container justify="center">
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
    </>
  );
};

export default ActNowButtonCard;
