import React from "react";
import PropTypes from "prop-types";

import { TextField, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import useStyles from "./useStyles";

function FormTextField({ ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();

  const { labelText, helperDescription, elemId } = props;

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
