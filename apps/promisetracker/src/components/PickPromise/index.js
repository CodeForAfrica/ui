import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { Section } from "@commons-ui/core";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import CtAButton from "@/promisetracker/components/CtAButton";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {
    paddingBottom: typography.pxToRem(40),
    paddingTop: typography.pxToRem(40),
  },
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

function PickPromise(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="body1">
              Pick a Promise*
            </Typography>
            <Typography variant="body2" className={classes.textContent}>
              Which promise do you want to petition?
            </Typography>
            <Autocomplete
              options={[
                // test data - replace with actual data
                { label: "Clean City" },
                { label: "Improve Transport" },
                { label: "Open Hospitals" },
                { label: "Lower Unemployment" },
                { label: "Improve Infrastructure" },
                { label: "Build Education Facilities" },
                { label: "Easy access to water" },
                { label: "Food transport" },
              ]}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(option) => (
                <>
                  <span>{option.label}</span>
                </>
              )}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="No Promises Selected"
                  variant="outlined"
                />
              )}
            />
            <Typography variant="body2" className={classes.textContent}>
              *Mandatory fields
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
              Start A Petiton
            </CtAButton>
            <CtAButton
              color="secondary"
              classes={{
                root: classes.cta,
                button: classes.ctaButton,
              }}
            >
              Join A Petiton
            </CtAButton>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

export default PickPromise;
