import React from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";

import CtAButton from "@/promisetracker/components/CtAButton";
import CloseIcon from "@material-ui/icons/Close";
import UpdateForm from "./UpdateForm";
import useStyles from "./useStyles";

function FormDialog({ open, handleFormClose, ...props }) {
  const classes = useStyles(props);

  return (
    <Dialog
      open={open}
      scroll="body"
      onClose={handleFormClose}
      aria-labelledby="form-dialog-title"
      aria-describedby="form-dialog-description"
      classes={{
        scrollBody: classes.scrollBody,
        paperScrollBody: classes.paperScrollBody,
        paperWidthSm: classes.paperWidthSm,
      }}
    >
      <DialogTitle
        disableTypography
        id="form-dialog-title"
        classes={{ root: classes.title }}
      >
        <Typography variant="h2">Update a petition</Typography>
        <IconButton
          disableRipple
          disableFocusRipple
          aria-label="close"
          onClick={handleFormClose}
        >
          <CloseIcon classes={{ root: classes.iconRoot }} />
        </IconButton>
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <DialogContentText
          id="form-dialog-description"
          classes={{ root: classes.description }}
        >
          Let us know of any recent change in this petition that you are aware
          of. A team of experts will review and update the petition.
        </DialogContentText>
        <UpdateForm {...props} />
      </DialogContent>
      <DialogActions>
        <CtAButton color="primary" onClick={handleFormClose}>
          Submit
        </CtAButton>
      </DialogActions>
    </Dialog>
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
