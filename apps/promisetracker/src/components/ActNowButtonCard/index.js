import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";
import FormDialog from "@/promisetracker/components/FormDialog";

// import ConnectCard from "./ConnectCard";
// import PetitionCard from "./PetitionCard";
// import FollowCard from "./FollowCard";
// import ShareCard from "./ShareCard";

import useStyles from "./useStyles";

const ActNowButtonCard = () => {
  const [open, setOpen] = useState(false);

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };
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
            <Button
              onClick={handleFormOpen}
              className={classes.button}
              variant="contained"
            >
              Update
            </Button>
            <Button className={classes.button} variant="contained">
              Share
            </Button>
          </Grid>
        </CardContent>
      </Card>
      <FormDialog open={open} handleFormClose={handleFormClose} />
    </>
  );
};

export default ActNowButtonCard;
