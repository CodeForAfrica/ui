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

function FormDialog({ session, open, handleFormClose, ...props }) {
  const classes = useStyles(props);
  const { petitionTitle, petitionDescription } = props;
  const [error, setError] = React.useState(null);
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    recipients: "",
    problemStatement: "",
    numberOfSignaturesRequired: null,
    image: {},
    video: "",
    source: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    fetch("/api/petitions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.ok) {
        console.log(response);
        handleFormClose();
        return response.json();
      }
      return setError(response.statusText || "Something went wrong");
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
        <Form
          values={values}
          onChange={setValues}
          {...props}
          onSubmit={handleSubmit}
        />
        <Typography>{error}</Typography>
      </DialogContent>
      <DialogActions>
        <CtAButton form="form-data" type="submit" color="primary">
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
  session: PropTypes.shape({
    accessToken: PropTypes.string,
  }),
};

FormDialog.defaultProps = {
  open: null,
  handleFormClose: null,
  petitionDescription: null,
  petitionTitle: null,
  session: null,
};

export default FormDialog;
