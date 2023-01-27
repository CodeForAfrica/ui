import { Grid, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Router from "next/router";
import { useSession } from "next-auth/react";
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
  const [success, setSuccess] = useState(false);

  const { data: session } = useSession();

  const classes = useStyles();

  const handleFormOpen = () => {
    if (!session) {
      setOpen(false);
      Router.push("/login");
    } else {
      setOpen(true);
    }
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSuccess(false);
  };

  const handleSnackbarOpen = () => {
    setSuccess(true);
  };

  return (
    <BaseContent
      onCloseCard={closeCard}
      title={petitionTitle}
      description={petitionDescription}
    >
      <Grid className={classes.flexItem} justifyContent="center">
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
        <FormDialog
          session={session}
          petitionSuccess={handleSnackbarOpen}
          open={open}
          handleFormClose={handleFormClose}
          {...props}
        />
        <Snackbar open={success}>
          <Alert onClose={handleSnackbarClose} severity="success">
            Petition successfully created!
          </Alert>
        </Snackbar>
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
