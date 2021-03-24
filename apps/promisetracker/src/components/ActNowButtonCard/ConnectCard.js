import React from "react";
import PropTypes from "prop-types";

import { CardContent, Typography, Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";

import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./useStyles";

const ConnectCard = ({ toggle }) => {
  const classes = useStyles();

  return (
    <CardContent className={classes.cardContent}>
      <CloseIcon onClick={toggle} className={classes.closeIcon} />
      <Grid container justify="center">
        <Typography variant="h4">Connect!</Typography>
      </Grid>
      <Grid container justify="center">
        <p className={classes.cardText}>
          Connect with others who care about this promise
        </p>
      </Grid>
      <Grid>
        <CtAButton
          color="secondary"
          classes={{
            root: classes.cardButtonRoot,
            button: `${classes.connectButton} ${classes.cardButton} `,
          }}
        >
          CTA TBC
        </CtAButton>
      </Grid>
    </CardContent>
  );
};

ConnectCard.propTypes = {
  toggle: PropTypes.func,
};

ConnectCard.defaultProps = {
  toggle: undefined,
};

export default ConnectCard;
