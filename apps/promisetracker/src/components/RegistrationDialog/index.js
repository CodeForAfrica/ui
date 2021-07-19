import { Button, DialogActions, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";

import useStyles from "./useStyles";

import ActionDialog from "@/promisetracker/components/ActionDialog";
import IndividualRegistrationDialog from "@/promisetracker/components/IndividualRegistrationDialog";

function RegistrationDialog({
  name: nameProp,
  onClose,
  onSubmit,
  open: openProp,
  individualRegistrationDialogProps,
  ...props
}) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(openProp);
  const [openDialog, setOpenDialog] = useState();
  const name = nameProp || "registration";

  const handleClose = () => {
    setOpenDialog(undefined);
    if (onClose) {
      onClose();
    } else {
      setOpen(false);
    }
  };

  const handleClickIndividual = () => setOpenDialog("individual");

  return (
    <>
      <ActionDialog
        {...props}
        name={name}
        onClose={handleClose}
        open={open}
        className={classes.root}
      >
        <DialogActions className={classes.actions}>
          <Grid container justify="space-between">
            <Grid item xs={12} lg="auto">
              <Button
                variant="outlined"
                onClick={handleClickIndividual}
                className={classes.button}
              >
                Individual
              </Button>
            </Grid>
            <Grid item xs={12} lg="auto">
              <Button variant="outlined" disabled className={classes.button}>
                Organisation
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </ActionDialog>
      <IndividualRegistrationDialog
        {...individualRegistrationDialogProps}
        key={openDialog === "individual"}
        onClose={handleClose}
        open={openDialog === "individual"}
      />
    </>
  );
}

RegistrationDialog.propTypes = {
  individualRegistrationDialogProps: PropTypes.shape({}),
  name: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
};

RegistrationDialog.defaultProps = {
  individualRegistrationDialogProps: undefined,
  name: null,
  onClose: null,
  onSubmit: null,
  open: false,
};

export default RegistrationDialog;
