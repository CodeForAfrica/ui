import React, { useState } from "react";
import PropTypes from "prop-types";

import { CardContent, Typography, Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import FormDialog from "@/promisetracker/components/FormDialog";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./useStyles";

const PetitionCard = ({ toggle, ...props }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  return (
    <CardContent className={classes.cardContent}>
      <CloseIcon onClick={toggle} className={classes.closeIcon} />
      <Grid container justify="center">
        <Typography variant="h4">Petition</Typography>
      </Grid>
      <Grid container justify="center">
        <p className={classes.cardText}>
          Not happy with progress or promise? Start or join a petition!
        </p>
      </Grid>
      <Grid container justify="center">
        <CtAButton
          color="secondary"
          onClick={handleFormOpen}
          classes={{
            root: classes.cardButtonRoot,
            button: classes.cardButton,
          }}
        >
          Start a Petition
        </CtAButton>
        <CtAButton
          color="secondary"
          classes={{
            root: classes.cardButtonRoot,
            button: classes.cardButton,
          }}
        >
          Join a Petition
        </CtAButton>
        <FormDialog open={open} handleFormClose={handleFormClose} {...props} />
      </Grid>
    </CardContent>
  );
};

PetitionCard.propTypes = {
  toggle: PropTypes.func,
};

PetitionCard.defaultProps = {
  toggle: undefined,
};

export default PetitionCard;
