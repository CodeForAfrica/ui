import { RichTypography } from "@commons-ui/core";
import {
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
} from "@material-ui/core";
import UserIcon from "@material-ui/icons/Person";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";

function SignPetition({ signatures }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.signatures}>
        {signatures &&
          signatures.map(({ name, time }) => (
            <div className={classes.signature}>
              <IconButton className={classes.iconButton} color="primary">
                <UserIcon />
              </IconButton>
              <RichTypography variant="caption" className={classes.text}>
                <span>{name}</span> signed {time} hours ago.
              </RichTypography>
            </div>
          ))}
      </div>
      <div className={classes.sign}>
        <IconButton className={classes.iconButton} color="primary">
          <UserIcon />
        </IconButton>
        <RichTypography
          variant="caption"
          className={`${classes.text} ${classes.name}`}
        >
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
          multiline
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
        <CtAButton
          color="secondary"
          classes={{
            root: classes.cardButtonRoot,
            button: classes.cardButton,
          }}
        >
          Sign Petition
        </CtAButton>
      </form>
    </div>
  );
}

SignPetition.propTypes = {
  signatures: PropTypes.arrayOf(PropTypes.shape({})),
};

SignPetition.defaultProps = {
  signatures: undefined,
};

export default SignPetition;
