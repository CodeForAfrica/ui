import React from "react";
import PropTypes from "prop-types";

import { TextField, CardContent, Typography, Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./useStyles";

const FollowCard = ({ toggle }) => {
  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      <CloseIcon onClick={toggle} className={classes.closeIcon} />
      <Grid container justify="center">
        <Typography variant="h4">Follow</Typography>
      </Grid>
      <Grid container justify="center">
        <p className={classes.cardText}>
          Get alerts whenever there is a development on the promise
        </p>
      </Grid>
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
    </CardContent>
  );
};

FollowCard.propTypes = {
  toggle: PropTypes.func,
};

FollowCard.defaultProps = {
  toggle: undefined,
};

export default FollowCard;
