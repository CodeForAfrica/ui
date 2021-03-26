import React, { useState } from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import FormDialog from "@/promisetracker/components/FormDialog";
import BaseCard from "./BaseCard";

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
    <BaseCard
      closeCard={closeCard}
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
    </BaseCard>
  );
};

PetitionCard.propTypes = {
  closeCard: PropTypes.func,
};

PetitionCard.defaultProps = {
  closeCard: undefined,
};

export default PetitionCard;
