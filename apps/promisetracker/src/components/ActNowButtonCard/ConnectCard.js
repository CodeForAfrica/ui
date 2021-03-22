import React from "react";
import { CardContent, Typography, Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";

import useStyles from "./useStyles";

const ConnectCard = () => {
  const classes = useStyles();

  return (
    <>
      <CardContent>
        <Grid container justify="center">
          <Typography variant="h4">Connect!</Typography>
        </Grid>
        <Grid container justify="center">
          <p className={classes.cardText}>
            Connect with others who care about this promise
          </p>
        </Grid>
        <Grid>
          <CtAButton
            color="secondary"
            classes={{
              root: classes.cardButtonRoot,
              button: `${classes.connectButton} ${classes.cardButton} `,
            }}
          >
            CTA TBC
          </CtAButton>
        </Grid>
      </CardContent>
    </>
  );
};

export default ConnectCard;
