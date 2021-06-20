import { Card, Grid, Button } from "@material-ui/core";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ShareIcon from "@material-ui/icons/Share";
import PropTypes from "prop-types";
import React, { useState } from "react";

import BaseContent from "./BaseContent";
import Cards from "./cards";
import ConnectCard from "./ConnectCard";
import FollowCard from "./FollowCard";
import PetitionCard from "./PetitionCard";
import ShareCard from "./ShareCard";
import useStyles from "./useStyles";

import UpdateFormDialog from "@/promisetracker/components/FormDialog/UpdateDialog";

const ActNowButtonCard = ({ promise_act_now: promiseActNow, ...props }) => {
  const {
    act_now: {
      act_now_title: actNowTitle,
      connect_label: connectLabel,
      petition_label: petitionLabel,
      follow_label: followLabel,
      update_label: updateLabel,
      share_label: shareLabel,
    },
  } = promiseActNow;

  const [open, setOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(Cards.ACT);

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  const selectCard = (name) => {
    setSelectedCard(Cards[name]);
  };

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        {selectedCard === Cards.CONNECT && (
          <ConnectCard
            promiseActNow={promiseActNow}
            {...props}
            closeCard={() => selectCard("ACT")}
          />
        )}
        {selectedCard === Cards.FOLLOW && (
          <FollowCard
            promiseActNow={promiseActNow}
            {...props}
            closeCard={() => selectCard("ACT")}
          />
        )}
        {selectedCard === Cards.PETITION && (
          <PetitionCard
            promiseActNow={promiseActNow}
            {...props}
            closeCard={() => selectCard("ACT")}
          />
        )}
        {selectedCard === Cards.SHARE && (
          <ShareCard
            promiseActNow={promiseActNow}
            {...props}
            closeCard={() => selectCard("ACT")}
          />
        )}
        {selectedCard === Cards.ACT && (
          <BaseContent className={classes.baseContent} title={actNowTitle}>
            <Grid className={classes.buttonContainer} item justify="center">
              <Button
                onClick={() => selectCard("CONNECT")}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <AllInclusiveIcon />
                </div>
                <div>{connectLabel}</div>
              </Button>
              <Button
                onClick={() => selectCard("PETITION")}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <ChatBubbleOutlineIcon />
                </div>
                <div>{petitionLabel}</div>
              </Button>
              <Button
                onClick={() => selectCard("FOLLOW")}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <ControlPointIcon />
                </div>
                <div>{followLabel}</div>
              </Button>
              <Button
                onClick={handleFormOpen}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <NotificationsNoneIcon />
                </div>
                <div>{updateLabel}</div>
              </Button>
              <Button
                onClick={() => selectCard("SHARE")}
                className={classes.button}
                variant="contained"
              >
                <div className={classes.buttonIcon}>
                  <ShareIcon />
                </div>
                <div>{shareLabel}</div>
              </Button>
            </Grid>
          </BaseContent>
        )}
      </Card>
      <UpdateFormDialog
        open={open}
        handleFormClose={handleFormClose}
        promise_act_now={promiseActNow}
        {...props}
      />
    </>
  );
};

ActNowButtonCard.propTypes = {
  promise_act_now: PropTypes.shape({
    act_now: {
      act_now_title: PropTypes.string,
      connect_label: PropTypes.string,
      petition_label: PropTypes.string,
      follow_label: PropTypes.string,
      update_label: PropTypes.string,
      share_label: PropTypes.string,
    },
  }),
};

ActNowButtonCard.defaultProps = {
  promise_act_now: PropTypes.shape({
    act_now: {
      act_now_title: null,
      connect_label: null,
      petition_label: null,
      follow_label: null,
      update_label: null,
      share_label: null,
    },
  }),
};

export default ActNowButtonCard;
