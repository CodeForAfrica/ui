import React, { useState } from "react";
import PropTypes, { string } from "prop-types";

import { Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import FormDialog from "@/promisetracker/components/FormDialog";
import BaseContent from "./BaseContent";

import useStyles from "./useStyles";

const PetitionCard = ({
  closeCard,
  promise_act_now: promiseActNow,
  ...props
}) => {
  const {
    petition: {
      petition_title: petitionTitle,
      petition_description: petitionDescription,
    },
  } = promiseActNow;

  const { petitionJoin, petitionTitle: petitionStart } = props;
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
      title={petitionTitle}
      description={petitionDescription}
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
          {petitionStart}
        </CtAButton>
        <CtAButton
          color="secondary"
          classes={{
            root: classes.cardButtonRoot,
            button: classes.cardButton,
          }}
        >
          {petitionJoin}
        </CtAButton>
        <FormDialog open={open} handleFormClose={handleFormClose} {...props} />
      </Grid>
    </BaseContent>
  );
};

PetitionCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
  petitionJoin: PropTypes.string,
  petitionStart: PropTypes.string,
  petitionTitle: PropTypes.string,
  promise_act_now: PropTypes.shape({
    petition: {
      petitionTitle: PropTypes.string,
      petitionDescription: PropTypes.string,
    },
  }),
};

PetitionCard.defaultProps = {
  petitionJoin: null,
  petitionStart: null,
  petitionTitle: string,
  promise_act_now: PropTypes.shape({
    petition: {
      petitionTitle: null,
      petitionDescription: null,
    },
  }),
};

export default PetitionCard;
