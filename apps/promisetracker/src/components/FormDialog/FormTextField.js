import { TextField, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function FormTextField(props) {
  const classes = useStyles(props);
  const theme = useTheme();

  const { labelText, helperDescription, elemId, required, type } = props;

  const helperVariant = useMediaQuery(theme.breakpoints.up("lg"))
    ? "body1"
    : "body2";

  return (
    <TextField
      classes={{
        root: helperDescription
          ? classes.formControl
          : classes.formControlRecipient,
      }}
      helperText={
        <Typography variant={helperVariant}>{helperDescription}</Typography>
      }
      label={labelText}
      id={elemId}
      type={type}
      required={required}
      InputProps={{
        classes: {
          input: classes.input,
          underline: classes.underline,
          root: classes.inputRoot,
        },
        inputProps: {
          variant: "outlined",
          "aria-describedby": `${elemId}-helper-text`,
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
      {...props}
    />
  );
}

FormTextField.propTypes = {
  labelText: PropTypes.string,
  helperDescription: PropTypes.string,
  elemId: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

FormTextField.defaultProps = {
  labelText: null,
  helperDescription: null,
  elemId: null,
  required: null,
  type: null,
};

export default FormTextField;
