import { RichTypography } from "@commons-ui/core";
import UserIcon from "@mui/icons-material/Person";
import {
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
} from "@mui/material";
import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import CtAButton from "@/promisetracker/components/CtAButton";

function SignPetition({ signatures, session }) {
  const classes = useStyles();

  if (!signatures) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.signatures}>
        {signatures &&
          signatures.map(({ signatory, created_at: time }) => {
            let name = "Anonymous";

            if (signatory) {
              const { first_name: firstName } = signatory;
              name = firstName;
            }

            const timeRange = formatDistance(new Date(time), new Date(), {
              addSuffix: true,
            });

            return (
              <div className={classes.signature} key={time}>
                <IconButton
                  className={classes.iconButton}
                  color="primary"
                  size="large"
                >
                  <UserIcon />
                </IconButton>
                <RichTypography variant="caption" className={classes.text}>
                  <span>{name}</span> signed {timeRange}
                </RichTypography>
              </div>
            );
          })}
      </div>
      <div className={classes.sign}>
        <IconButton className={classes.iconButton} color="primary" size="large">
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
          InputProps={{ className: classes.input, disableUnderline: true }}
          variant="standard"
          multiline
          className={classes.textfield}
          placeholder="Your message (optional)..."
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
          disabled={!session}
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
  session: PropTypes.shape({}),
};

export default SignPetition;
