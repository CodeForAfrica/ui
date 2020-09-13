import React, { useState } from "react";
import PropTypes from "prop-types";

import { FormControl, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import sendIcon from "assets/subscribe-email.svg";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    alignItems: "center",
    display: "flex",
  },

  formControl: {
    width: "100%",
  },
  input: {
    display: "flex",
    "& input::placeholder": {
      fontSize: typography.pxToRem(12),
    },
  },
  iconBbutton: {
    marginTop: "1rem",
    display: "block",
    cursor: "pointer",
  },
  inputForm: {
    display: "block",
    maxWidth: "16rem",
  },
}));

export default function Form({ placeholder, ...props }) {
  const classes = useStyles(props);
  const [email, setEmail] = useState();
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form className={classes.root}>
      <FormControl className={classes.formControl}>
        <Grid container>
          <Grid item xs={12} container className={classes.inputForm}>
            <TextField
              onChange={handleChange}
              value={email}
              className={classes.input}
              placeholder={placeholder}
            />
            <img
              alt="send email Button"
              className={classes.iconBbutton}
              src={sendIcon}
            />
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}

Form.propTypes = {
  placeholder: PropTypes.string,
};

Form.defaultProps = {
  placeholder: "Enter your Email",
};
