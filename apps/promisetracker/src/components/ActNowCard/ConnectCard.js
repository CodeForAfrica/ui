import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import BaseContent from "./BaseContent";

import useStyles from "./useStyles";

const ConnectCard = ({ closeCard, ...props }) => {
  const {
    promise_act_now: {
      connect: {
        connect_title: connectTitle,
        connect_description: connectDescription,
        connect_button: connectButton,
      },
    },
  } = props;
  const classes = useStyles();

  return (
    <BaseContent
      close
      onCloseCard={closeCard}
      title={connectTitle}
      description={connectDescription}
    >
      <Grid>
        <CtAButton
          color="secondary"
          classes={{
            root: classes.cardButtonRoot,
            button: `${classes.connectButton} ${classes.cardButton} `,
          }}
        >
          {connectButton}
        </CtAButton>
      </Grid>
    </BaseContent>
  );
};

ConnectCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
  promise_act_now: PropTypes.shape({
    connect: {
      connectTitle: PropTypes.string,
      connectDescription: PropTypes.string,
      connectButton: PropTypes.string,
    },
  }),
};

ConnectCard.defaultProps = {
  promise_act_now: PropTypes.shape({
    connect: {
      connectTitle: null,
      connectDescription: null,
      connectButton: null,
    },
  }),
};

export default ConnectCard;
