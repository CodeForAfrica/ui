import React from "react";
import PropTypes from "prop-types";

import { TextField, Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import BaseContent from "./BaseContent";

import useStyles from "./useStyles";

const FollowCard = ({ closeCard, ...props }) => {
  const classes = useStyles();

  const {
    promise_act_now: {
      follow: {
        follow_title: followTitle,
        follow_description: followDescription,
        follow_button: followButton,
      },
    },
  } = props;

  return (
    <BaseContent
      close
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
};

FollowCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
  promise_act_now: PropTypes.shape({
    follow: {
      followTitle: PropTypes.string,
      followDescription: PropTypes.string,
      followButton: PropTypes.string,
    },
  }),
};

FollowCard.defaultProps = {
  promise_act_now: PropTypes.shape({
    follow: {
      followTitle: null,
      followDescription: null,
      followButton: null,
    },
  }),
};

export default FollowCard;
