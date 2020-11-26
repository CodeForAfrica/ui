import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
} from "@material-ui/core";
import { Section } from "@commons-ui/core";

import CtAButton from "@/promisetracker/components/CtAButton";
import FormDialog from "@/promisetracker/components/FormDialog";

import useStyles from "./useStyles";

function PickPromise({ promises, ...props }) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [selectedPromise, setPromise] = useState("No Promise Selected");

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setPromise(e.target.value);
  };

  const {
    pickPromiseTitle,
    pickPromiseDescription,
    mandatoryText,
    petitionStart,
    petitionJoin,
  } = props;

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container>
          <Grid item lg={5} xs={12}>
            <form>
              <FormControl
                classes={{
                  root: classes.formControl,
                }}
              >
                <InputLabel
                  htmlFor="select-promise"
                  classes={{ root: classes.title }}
                >
                  {pickPromiseTitle}
                </InputLabel>
                <FormHelperText classes={{ root: classes.textContent }}>
                  {pickPromiseDescription}
                </FormHelperText>
                <Select
                  inputProps={{ id: "select-promise" }}
                  classes={{
                    root: classes.inputSection,
                    icon: classes.icon,
                  }}
                  value={selectedPromise}
                  renderValue={(value) => value}
                  onChange={handleChange}
                  variant="outlined"
                >
                  {promises.map((promise) => (
                    <MenuItem key={promise.title} value={promise.title}>
                      {promise.title}
                    </MenuItem>
                  ))}
                </Select>
                <Typography classes={{ root: classes.mandatoryText }}>
                  {mandatoryText}
                </Typography>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <CtAButton
              color="secondary"
              onClick={handleFormOpen}
              classes={{
                root: classes.cta,
                button: classes.ctaButton,
              }}
            >
              {petitionStart}
            </CtAButton>
            <CtAButton
              color="secondary"
              classes={{
                root: classes.cta,
                button: classes.ctaButton,
              }}
            >
              {petitionJoin}
            </CtAButton>
            <FormDialog
              open={open}
              handleFormClose={handleFormClose}
              {...props}
            />
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

PickPromise.propTypes = {
  promises: PropTypes.arrayOf(PropTypes.shape({})),
  pickPromiseTitle: PropTypes.string,
  pickPromiseDescription: PropTypes.string,
  mandatoryText: PropTypes.string,
  petitionStart: PropTypes.string,
  petitionJoin: PropTypes.string,
};

PickPromise.defaultProps = {
  promises: null,
  pickPromiseTitle: null,
  pickPromiseDescription: null,
  mandatoryText: null,
  petitionStart: null,
  petitionJoin: null,
};

export default PickPromise;
