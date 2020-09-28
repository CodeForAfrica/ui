import React, { useState } from "react";

import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, IconButton, Typography, useMediaQuery } from "@material-ui/core";

import viz1 from "@/promisetracker/assets/hero-icon-viz1-onclick.svg";
import viz2 from "@/promisetracker/assets/hero-icon-viz2.svg";
import info from "@/promisetracker/assets/hero-icon-info.svg";
import share from "@/promisetracker/assets/hero-icon-share.svg";
import StatusListPopover from "@/promisetracker/components/Hero/ProfileChart/StatusListPopover";

import MobileChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart";
import DesktopChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart";

import PromiseKeptChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/PromiseKeptChart";
import UncertainChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/UncertainChart";
import PromiseNotKeptChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/PromiseNotKeptChart";

import MobilePromiseKeptChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobilePromiseKeptChart";
import MobilePromiseNotKeptChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobilePromiseNotKeptChart";
import MobileUncertainChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobileUncertainChart";

const useStyles = makeStyles(() => ({
  iconGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  iconButton: {
    background: "#F7F7F7",
    padding: "1rem",
  },
  img: {},
}));

function ProfileDetails({ name, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [clicked, setClicked] = useState();

  const handleOnClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
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
            <Grid
              container
              direction="row"
              item
              xs={4}
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <IconButton
                  disableRipple
                  disableFocusRipple
                  aria-label="Info"
                  size="small"
                  onClick={handleOnClick}
                  className={classes.iconButton}
                >
                  {clicked ? (
                    <img src={viz1} alt="Viz1" className={classes.img} />
                  ) : (
                    <img src={viz2} alt="Viz2" className={classes.img} />
                  )}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  disableRipple
                  disableFocusRipple
                  aria-label="Info"
                  size="small"
                  className={classes.iconButton}
                >
                  <img src={info} alt="Info" className={classes.img} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  disableRipple
                  disableFocusRipple
                  aria-label="Share"
                  size="small"
                  className={classes.iconButton}
                >
                  <img src={share} alt="Share" className={classes.img} />
                </IconButton>
              </Grid>
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
            <Grid
              container
              item
              xs={6}
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <StatusListPopover />
              <Grid item xs={3}>
                <IconButton
                  disableRipple
                  disableFocusRipple
                  aria-label="Share"
                  size="small"
                  className={classes.iconButton}
                >
                  <img src={share} alt="Share" className={classes.img} />
                </IconButton>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <>
        {isDesktop ? (
          <DesktopChart>
            <PromiseKeptChart name="Promises Kept" />
            <UncertainChart name="Uncertain" />
            <PromiseNotKeptChart name="Promises Not Kept" />
          </DesktopChart>
        ) : (
          <MobileChart>
            <MobilePromiseKeptChart name="Promise Kept" />
            <MobileUncertainChart name="Uncertain" />
            <MobilePromiseNotKeptChart name="Promise Not Kept" />
          </MobileChart>
        )}
      </>
    </>
  );
}

ProfileDetails.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProfileDetails;
