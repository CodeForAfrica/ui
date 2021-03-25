import React from "react";
import PropTypes from "prop-types";

import { TextField, Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import BaseCard from "./BaseCard";

import useStyles from "./useStyles";

const FollowCard = ({ closeCard }) => {
  const classes = useStyles();

  return (
    <BaseCard
      title="Follow"
      description="Get alerts whenever there is a development on the promise"
      closeCard={closeCard}
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
            SUBMIT
          </CtAButton>
        </form>
      </Grid>
    </BaseCard>
  );
};

FollowCard.propTypes = {
  closeCard: PropTypes.func,
};

FollowCard.defaultProps = {
  closeCard: undefined,
};

export default FollowCard;
