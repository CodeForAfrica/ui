import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@material-ui/core";
import UpdateFormDialog from "@/promisetracker/components/FormDialog/UpdateDialog";

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

const ActNowButtonCard = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  const cardStates = {
    connect: false,
    follow: false,
    petition: false,
    share: false,
    act: true,
  };

  const [cardState, setState] = useState(cardStates);

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  const toggleState = (name) => {
    setState({
      ...cardState,
      [name]: !cardState[name],
      act: !cardState.act,
    });
  };

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        {cardState.connect && (
          <ConnectCard closeCard={() => toggleState("connect")} />
        )}
        {cardState.follow && (
          <FollowCard closeCard={() => toggleState("follow")} />
        )}
        {cardState.petition && (
          <PetitionCard {...props} closeCard={() => toggleState("petition")} />
        )}
        {cardState.share && (
          <ShareCard closeCard={() => toggleState("share")} />
        )}
        {cardState.act && (
          <CardContent>
            <Grid container justify="center">
              <Typography className={classes.cardTitle} variant="h4">
                Act Now!
              </Typography>
            </Grid>
            <Grid className={classes.buttonContainer} item justify="center">
              <Button
                onClick={() => toggleState("connect")}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <AllInclusiveIcon />
                </div>
                <div>Connect</div>
              </Button>
              <Button
                onClick={() => toggleState("petition")}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <ChatBubbleOutlineIcon />
                </div>
                <div>Petition</div>
              </Button>
              <Button
                onClick={() => toggleState("follow")}
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
                onClick={() => toggleState("share")}
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
      <UpdateFormDialog
        open={open}
        handleFormClose={handleFormClose}
        {...props}
      />
    </>
  );
};

export default ActNowButtonCard;
