import { RichTypography } from "@commons-ui/core";
import {
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function SignPetition({ signatures, owner }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.signatures}>
        {signatures &&
          signatures.map(({ name, time }) => (
            <div className={classes.signature}>
              <RichTypography variant="caption" className={classes.text}>
                <span>{name}</span> signed {time} hours ago.
              </RichTypography>
            </div>
          ))}
      </div>
      <div className={classes.sign}>
        <RichTypography variant="caption" className={classes.text}>
          You
        </RichTypography>
      </div>
      <form>
        <TextField
          InputLabelProps={{
            className: classes.textFieldLabel,
          }}
          InputProps={{ className: classes.input, disableUnderline: true }}
          variant="standard"
          className={classes.textfield}
          label="Your message (optional)..."
        />
        <FormGroup>
          <FormControlLabel
            className={classes.petitionLabel}
            control={<Checkbox className={classes.checkbox} />}
            label={
              <Typography variant="caption" className={classes.text}>
                Do not display my name and message
              </Typography>
            }
          />
        </FormGroup>
      </form>
    </div>
  );
}

SignPetition.propTypes = {
  signature: PropTypes.arrayOf(PropTypes.shape({})),
};

SignPetition.defaultProps = {
  signatures: undefined,
};

export default SignPetition;
