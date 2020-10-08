import React, { useState } from "react";

import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  Fade,
  Divider,
} from "@material-ui/core";

import viz1 from "@/promisetracker/assets/hero-icon-viz1-onclick.svg";
import viz2 from "@/promisetracker/assets/hero-icon-viz2.svg";
import share from "@/promisetracker/assets/hero-icon-share.svg";

import DesktopInfoStatusPopover from "@/promisetracker/components/Hero/ProfileChart/DesktopInfoStatusPopover";
import MobileInfoStatusPopover from "@/promisetracker/components/Hero/ProfileChart/MobileInfoStatusPopover";

import MobileChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart";
import DesktopChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart";

import PromiseKeptChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/PromiseKeptChart";
import UncertainChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/UncertainChart";
import PromiseNotKeptChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/PromiseNotKeptChart";

import MobilePromiseKeptChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobilePromiseKeptChart";
import MobilePromiseNotKeptChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobilePromiseNotKeptChart";
import MobileUncertainChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobileUncertainChart";

import RectChart from "@/promisetracker/components/Hero/ProfileChart/RectChart";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    position: "relative",
  },
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
  img: {
    height: "auto",
    maxWidth: "100%",
  },
  viz1: {
    width: "1.5rem",
    height: "auto",
    maxWidth: "100%",
  },
  rect: {
    padding: "2rem 0rem",
  },
  divider: {
    margin: "2rem 1rem 1rem 1rem",
    height: typography.pxToRem(200),
  },
}));

function ProfileDetails({ name, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [clicked, setClicked] = useState(false);

  const handleOnClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        item
        xs={12}
        spacing={3}
        className={classes.root}
      >
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
                  clicked={clicked}
                  className={classes.iconButton}
                >
                  {clicked ? (
                    <img src={viz1} alt="Viz1" className={classes.viz1} />
                  ) : (
                    <img src={viz2} alt="Viz2" className={classes.img} />
                  )}
                </IconButton>
              </Grid>
              <DesktopInfoStatusPopover />
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
              justify="space-evenly"
              alignItems="center"
            >
              <MobileInfoStatusPopover />
              <Grid item xs={3}>
                <IconButton
                  disableRipple
                  disableFocusRipple
                  aria-label="Share"
                  size="medium"
                  className={classes.iconButton}
                >
                  <img src={share} alt="Share" />
                </IconButton>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <>
        {isDesktop ? (
          <DesktopChart>
            {clicked ? (
              <Fade in={clicked}>
                <div className={classes.rect}>
                  <RectChart />
                </div>
              </Fade>
            ) : (
              <>
                <PromiseKeptChart name="Promises Kept" />
                <Divider orientation="vertical" className={classes.divider} />
                <UncertainChart name="Uncertain" />
                <Divider orientation="vertical" className={classes.divider} />
                <PromiseNotKeptChart name="Promises Not Kept" />
              </>
            )}
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
