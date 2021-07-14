import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React, { useState } from "react";

import useStyles from "./useStyles";

import Form from "@/promisetracker/components/IndividualRegistrationForm";

function IndividualRegistrationDialog({
  name: nameProp,
  onClose,
  onSubmit,
  open: openProp,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(openProp);
  const name = nameProp || "individual-registration-dialog";

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setOpen(false);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      scroll="body"
      onClose={handleClose}
      aria-labelledby={`${name}-title`}
      classes={{
        scrollBody: classes.scrollBody,
        paperScrollBody: classes.paperScrollBody,
        paperWidthSm: classes.paperWidthSm,
      }}
    >
      <DialogTitle
        disableTypography
        id={`${name}-title`}
        classes={{ root: classes.title }}
      >
        <Typography variant="h2">{title}</Typography>
        <IconButton
          disableRipple
          disableFocusRipple
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon classes={{ root: classes.iconRoot }} />
        </IconButton>
      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        <Form {...props} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

IndividualRegistrationDialog.propTypes = {
  name: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};

IndividualRegistrationDialog.defaultProps = {
  name: null,
  onClose: null,
  onSubmit: null,
  open: false,
  title: null,
};

export default IndividualRegistrationDialog;
