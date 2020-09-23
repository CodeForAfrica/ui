import React from "react";

import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, IconButton, Typography, useMediaQuery } from "@material-ui/core";

import viz2 from "@/promisetracker/assets/hero-icon-viz2.svg";
import share from "@/promisetracker/assets/hero-icon-share.svg";

const useStyles = makeStyles(() => ({
  iconGrid: {
    display: "flex",
    flexDirection: "row",
  },
  iconButton: {
    background: "#F7F7F7",
    padding: "1.5rem",
    margin: "0.5rem",
  },
}));

function ProfileDetails({ name, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid container direction="row" item spacing={3}>
      {isDesktop ? (
        <>
          <Grid item xs={8}>
            {isDesktop ? <Typography variant="h1">{name}</Typography> : null}
            <Typography variant="body2">
              Nairobi Governor Mike “Sonko” Mbuvi <b>510 promises </b>at a
              glance
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.iconGrid}>
            <IconButton
              disableRipple
              disableFocusRipple
              aria-label="Info"
              size="small"
              className={classes.iconButton}
            >
              <img src={viz2} alt="Info" />
            </IconButton>
            <IconButton
              disableRipple
              disableFocusRipple
              aria-label="Share"
              size="small"
              className={classes.iconButton}
            >
              <img src={share} alt="Share" />
            </IconButton>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={6}>
            <Typography variant="body2">
              Nairobi Governor Mike “Sonko” Mbuvi <b>510 promises </b>at a
              glance
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.iconGrid}>
            <IconButton
              disableRipple
              disableFocusRipple
              aria-label="Share"
              size="small"
              className={classes.iconButton}
            >
              <img src={share} alt="Share" />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  );
}

ProfileDetails.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProfileDetails;
