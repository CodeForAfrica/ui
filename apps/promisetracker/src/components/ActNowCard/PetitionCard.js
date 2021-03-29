import React, { useState } from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import FormDialog from "@/promisetracker/components/FormDialog";
import BaseContent from "./BaseContent";

import useStyles from "./useStyles";

const PetitionCard = ({ closeCard, ...props }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  return (
    <BaseContent
      onCloseCard={closeCard}
      title="Petition"
      description="Not happy with progress or promise? Start or join a petition!"
    >
      <Grid className={classes.flexItem} justify="center">
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
    </BaseContent>
  );
};

PetitionCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
};

export default PetitionCard;
