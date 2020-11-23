import React from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

import CtAButton from "@/promisetracker/components/CtAButton";
import Form from "./Form";
import useStyles from "./useStyles";

function FormDialog({ open, handleFormClose, ...props }) {
  const classes = useStyles(props);

  const { petitionTitle, petitionDescription } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleFormClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
        classes={{ root: classes.section, paperWidthSm: classes.paperWidthSm }}
      >
        <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>
          {petitionTitle}
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
          <DialogContentText
            id="form-dialog-description"
            classes={{ root: classes.description }}
          >
            {petitionDescription}
          </DialogContentText>
          <Form {...props} />
        </DialogContent>
        <DialogActions>
          <CtAButton color="primary" onClick={handleFormClose}>
            Submit
          </CtAButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.propTypes = {
  handleFormClose: PropTypes.func,
  open: PropTypes.bool,
  petitionDescription: PropTypes.string,
  petitionTitle: PropTypes.string,
};

FormDialog.defaultProps = {
  open: null,
  handleFormClose: null,
  petitionDescription: null,
  petitionTitle: null,
};

export default FormDialog;
