import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import BaseContent from "./BaseContent";
import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";

function ConnectCard({ closeCard, promiseActNow }) {
  const {
    connect: {
      connect_title: connectTitle,
      connect_description: connectDescription,
      connect_button: connectButton,
    },
  } = promiseActNow;
  const classes = useStyles();

  return (
    <BaseContent
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
}

ConnectCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
  promiseActNow: PropTypes.shape({
    connect: {
      connectTitle: PropTypes.string,
      connectDescription: PropTypes.string,
      connectButton: PropTypes.string,
    },
  }),
};

ConnectCard.defaultProps = {
  promiseActNow: PropTypes.shape({
    connect: {
      connectTitle: null,
      connectDescription: null,
      connectButton: null,
    },
  }),
};

export default ConnectCard;
