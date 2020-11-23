import React from "react";
import PropTypes from "prop-types";

import { TextField } from "@material-ui/core";

import useStyles from "./useStyles";

function FormTextField({ ...props }) {
  const classes = useStyles(props);

  const { labelText, helperDescription, elemId } = props;

  return (
    <TextField
      classes={{
        root: helperDescription
          ? classes.formControl
          : classes.formControlRecipient,
      }}
      helperText={helperDescription}
      label={labelText}
      id={elemId}
      inputProps={{
        variant: "outlined",
        "aria-describedby": `${elemId}-helper-text`,
      }}
      InputProps={{
        classes: {
          input: classes.input,
          underline: classes.underline,
          root: classes.inputRoot,
        },
      }}
      FormHelperTextProps={{
        classes: { root: classes.helperText },
      }}
      InputLabelProps={{
        classes: {
          root: helperDescription ? classes.label : classes.recipientLabel,
        },
      }}
    />
  );
}

FormTextField.propTypes = {
  labelText: PropTypes.string,
  helperDescription: PropTypes.string,
  elemId: PropTypes.string,
};

FormTextField.defaultProps = {
  labelText: null,
  helperDescription: null,
  elemId: null,
};

export default FormTextField;
