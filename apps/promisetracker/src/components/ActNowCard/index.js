import React, { useState } from "react";
import { Card, Grid, Button } from "@material-ui/core";
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
import BaseContent from "./BaseContent";
import selectedCard from "./enums";

import useStyles from "./useStyles";

const ActNowButtonCard = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  const [card, setCard] = useState(selectedCard.ACT);

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  const selectCard = (name) => {
    setCard(selectedCard[name]);
  };

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        {card === "connect" && (
          <ConnectCard {...props} closeCard={() => selectCard("ACT")} />
        )}
        {card === "follow" && (
          <FollowCard {...props} closeCard={() => selectCard("ACT")} />
        )}
        {card === "petition" && (
          <PetitionCard {...props} closeCard={() => selectCard("ACT")} />
        )}
        {card === "share" && (
          <ShareCard {...props} closeCard={() => selectCard("ACT")} />
        )}
        {card === "act" && (
          <BaseContent className={classes.baseContent} title="Act Now!">
            <Grid className={classes.buttonContainer} item justify="center">
              <Button
                onClick={() => selectCard("CONNECT")}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <AllInclusiveIcon />
                </div>
                <div>Connect</div>
              </Button>
              <Button
                onClick={() => selectCard("PETITION")}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <ChatBubbleOutlineIcon />
                </div>
                <div>Petition</div>
              </Button>
              <Button
                onClick={() => selectCard("FOLLOW")}
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
                onClick={() => selectCard("SHARE")}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <ShareIcon />
                </div>
                <div>Share</div>
              </Button>
            </Grid>
          </BaseContent>
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
