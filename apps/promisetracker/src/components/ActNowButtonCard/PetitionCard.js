import React, { useState } from "react";
import { CardContent, Typography, Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import FormDialog from "@/promisetracker/components/FormDialog";

import useStyles from "./useStyles";

const PetitionCard = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CardContent>
        {/* <span className={classes.closeIcon}>X</span> */}
        <Grid container justify="center">
          <Typography variant="h4">Petition</Typography>
        </Grid>
        <Grid container justify="center">
          <p className={classes.petitionText}>
            Not happy with progress or promise? Start or join a petition!
          </p>
        </Grid>
        <Grid container justify="center">
          <CtAButton
            color="secondary"
            onClick={handleFormOpen}
            classes={{
              root: classes.petitionRoot,
              button: classes.petitionButton,
            }}
          >
            Start a Petition
          </CtAButton>
          <CtAButton
            color="secondary"
            classes={{
              root: classes.petitionRoot,
              button: classes.petitionButton,
            }}
          >
            Join a Petition
          </CtAButton>
          <FormDialog
            open={open}
            handleFormClose={handleFormClose}
            {...props}
          />
        </Grid>
      </CardContent>
    </>
  );
};

export default PetitionCard;
