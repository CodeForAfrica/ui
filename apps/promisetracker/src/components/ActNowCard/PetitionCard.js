import { Grid } from "@material-ui/core";
import { useSession } from "next-auth/react";
import Router from "next/router";
import PropTypes, { string } from "prop-types";
import React, { useState } from "react";

import BaseContent from "./BaseContent";
import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";
import FormDialog from "@/promisetracker/components/FormDialog";

function PetitionCard({ closeCard, promiseActNow, ...props }) {
  const {
    petition: {
      petition_title: petitionTitle,
      petition_description: petitionDescription,
    },
  } = promiseActNow;

  const { petitionJoin, petitionTitle: petitionStart } = props;
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const classes = useStyles();

  const handleFormOpen = () => {
    setOpen(true);

    if (!session) {
      setOpen(false);
      Router.push("/act-now");
    }
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
}

PetitionCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
  petitionJoin: PropTypes.string,
  petitionStart: PropTypes.string,
  petitionTitle: PropTypes.string,
  promiseActNow: PropTypes.shape({
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
  promiseActNow: PropTypes.shape({
    petition: {
      petitionTitle: null,
      petitionDescription: null,
    },
  }),
};

export default PetitionCard;
