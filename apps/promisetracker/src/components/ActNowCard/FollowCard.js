import React from "react";
import PropTypes from "prop-types";

import { TextField, Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import BaseContent from "./BaseContent";

import useStyles from "./useStyles";

const FollowCard = ({ closeCard }) => {
  const classes = useStyles();

  return (
    <BaseContent
      close
      title="Follow"
      description="Get alerts whenever there is a development on the promise"
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
            SUBMIT
          </CtAButton>
        </form>
      </Grid>
    </BaseContent>
  );
};

FollowCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
};

export default FollowCard;
