import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import useStyles from "./useStyles";

const PetitionCard = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Grid container justify="center">
            <Typography variant="h4">Petition</Typography>
          </Grid>
          <Grid className={classes.buttonContainer} container justify="center">
            <p>
              Not happy wirth progress or promise? Start or join a petition!
            </p>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default PetitionCard;
