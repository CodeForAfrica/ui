import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { Section } from "@commons-ui/core";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import CtAButton from "@/promisetracker/components/CtAButton";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {
    paddingBottom: typography.pxToRem(45),
    paddingTop: typography.pxToRem(45),
  },
  endAdornment: {
    backgroundColor: "#005DFD",
    top: 0,
    height: "59px",
    right: "0px !important",
  },
  popUpIndicator: {
    color: "white",
  },
  clearIndicator: { color: "white" },
  root: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(25)} 0`,
    },
  },
  title: {
    textTransform: "uppercase",
    fontFamily: typography.fontFamily,
    fontWeight: 600,
    fontSize: typography.pxToRem(16),
  },
  textContent: {
    fontSize: typography.pxToRem(14),
    paddingTop: typography.pxToRem(8),
    paddingBottom: typography.pxToRem(8),
  },
  cta: {
    padding: "0rem 4rem 0rem 0rem",
    width: "auto",
    justifyContent: "flex-start",
  },

  ctaButton: {
    borderRadius: typography.pxToRem(5),
    minWidth: typography.pxToRem(272),
    padding: typography.pxToRem(25),
    "&:hover": {
      backgroundColor: "#005DFD",
      color: "white",
    },
  },
  buttonContainer: {
    display: "flex",
    [breakpoints.down("sm")]: {
      display: "block",
    },
  },
}));

function PickPromise({ promises, ...props }) {
  const classes = useStyles(props);

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
          <Grid item xs={12}>
            <Typography className={classes.title} variant="body1">
              {pickPromiseTitle}
            </Typography>
            <Typography variant="body2" className={classes.textContent}>
              {pickPromiseDescription}
            </Typography>
            <Autocomplete
              classes={{
                endAdornment: classes.endAdornment,
                popupIndicator: classes.popUpIndicator,
                clearIndicator: classes.clearIndicator,
              }}
              options={promises || []}
              autoHighlight
              getOptionLabel={(option) => option.title}
              renderOption={(option) => (
                <>
                  <span>{option.title}</span>
                </>
              )}
              style={{ width: 400 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="No Promises Selected"
                  variant="outlined"
                />
              )}
            />
            <Typography variant="body2" className={classes.textContent}>
              {mandatoryText}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <CtAButton
              color="secondary"
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
