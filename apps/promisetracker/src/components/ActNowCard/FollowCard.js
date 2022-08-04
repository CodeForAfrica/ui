import { TextField, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import BaseContent from "./BaseContent";
import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";

function FollowCard({ closeCard, promiseActNow }) {
  const classes = useStyles();

  const {
    follow: {
      follow_title: followTitle,
      follow_description: followDescription,
      follow_button: followButton,
    },
  } = promiseActNow;

  return (
    <BaseContent
      title={followTitle}
      description={followDescription}
      onCloseCard={closeCard}
    >
      <Grid>
        <form className={classes.formContainer}>
          <TextField
            id="outlined-basic"
            label="example@mail.com"
            variant="outlined"
            className={classes.input}
          />
          <CtAButton
            color="primary"
            classes={{
              root: classes.submitButton,
              button: classes.submitButton,
            }}
          >
            {followButton}
          </CtAButton>
        </form>
      </Grid>
    </BaseContent>
  );
}

FollowCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
  promiseActNow: PropTypes.shape({
    follow: {
      followTitle: PropTypes.string,
      followDescription: PropTypes.string,
      followButton: PropTypes.string,
    },
  }),
};

FollowCard.defaultProps = {
  promiseActNow: PropTypes.shape({
    follow: {
      followTitle: null,
      followDescription: null,
      followButton: null,
    },
  }),
};

export default FollowCard;
