import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React from "react";

import Form from "./Form";
import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";

function FormDialog({ open, handleFormClose, ...props }) {
  const classes = useStyles(props);
  const { petitionTitle, petitionDescription } = props;
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    recipients: "",
    problemStatement: "",
    numberOfSignaturesRequired: null,
    image: null,
    video: null,
    source: "",
  });

  const handleSubmit = () => {
    values.source = { link: values.source };
    values.number_of_signatures_required = values.numberOfSignaturesRequired;
    values.problem_statement = values.problemStatement;

    fetch("/api/petition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .finally(() => {
        handleFormClose();
      });
  };
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
        <Typography variant="h2">{petitionTitle}</Typography>
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
          {petitionDescription}
        </DialogContentText>
        <Form values={values} onChange={setValues} {...props} />
      </DialogContent>
      <DialogActions>
        <CtAButton color="primary" onClick={handleSubmit}>
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
