import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";
import FormDialog from "@/promisetracker/components/FormDialog";

import ConnectCard from "./ConnectCard";
import ShareCard from "./ShareCard";
import FollowCard from "./FollowCard";
import PetitionCard from "./PetitionCard";

import useStyles from "./useStyles";

const ActNowButtonCard = () => {
  const [open, setOpen] = useState(false);

  const [connect, setConnect] = useState(false);
  const [follow, setFollow] = useState(false);
  const [petition, setPetition] = useState(false);
  const [share, setShare] = useState(false);
  const [act, setAct] = useState(true);

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  const toggleState = (state, stateMethod) => {
    stateMethod(!state);
    setAct(!act);
  };

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        {connect && (
          <ConnectCard toggle={() => toggleState(connect, setConnect)} />
        )}
        {follow && <FollowCard toggle={() => toggleState(follow, setFollow)} />}
        {petition && (
          <PetitionCard toggle={() => toggleState(petition, setPetition)} />
        )}
        {share && <ShareCard toggle={() => toggleState(share, setShare)} />}
        {act && (
          <CardContent>
            <Grid container justify="center">
              <Typography className={classes.cardTitle} variant="h4">
                Act Now!
              </Typography>
            </Grid>
            <Grid
              className={classes.buttonContainer}
              container
              justify="center"
            >
              <Button
                onClick={() => toggleState(connect, setConnect)}
                className={classes.button}
                variant="contained"
              >
                Connect
              </Button>
              <Button
                onClick={() => toggleState(connect, setPetition)}
                className={classes.button}
                variant="contained"
              >
                Petition
              </Button>
              <Button
                onClick={() => toggleState(connect, setFollow)}
                className={classes.button}
                variant="contained"
              >
                Follow
              </Button>
              <Button
                onClick={handleFormOpen}
                className={classes.button}
                variant="contained"
              >
                Update
              </Button>
              <Button
                onClick={() => toggleState(connect, setShare)}
                className={classes.button}
                variant="contained"
              >
                Share
              </Button>
            </Grid>
          </CardContent>
        )}
      </Card>
      <FormDialog open={open} handleFormClose={handleFormClose} />
    </>
  );
};

export default ActNowButtonCard;
