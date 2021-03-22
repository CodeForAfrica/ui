import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";
import FormDialog from "@/promisetracker/components/FormDialog";

import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ShareIcon from "@material-ui/icons/Share";

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
                <div className={classes.buttonIcon}>
                  <AllInclusiveIcon />
                </div>
                <div>Connect</div>
              </Button>
              <Button
                onClick={() => toggleState(connect, setPetition)}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <ChatBubbleOutlineIcon />
                </div>
                <div>Petition</div>
              </Button>
              <Button
                onClick={() => toggleState(connect, setFollow)}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <ControlPointIcon />
                </div>
                <div>Follow</div>
              </Button>
              <Button
                onClick={handleFormOpen}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <NotificationsNoneIcon />
                </div>
                <div>Update</div>
              </Button>
              <Button
                onClick={() => toggleState(connect, setShare)}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <ShareIcon />
                </div>
                <div>Share</div>
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
