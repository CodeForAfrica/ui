import React, { useState } from "react";

import PropTypes from "prop-types";

import {
  Fade,
  Grid,
  Hidden,
  IconButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import viz1 from "@/promisetracker/assets/hero-icon-viz1-onclick.svg";
import viz2 from "@/promisetracker/assets/hero-icon-viz2.svg";
import share from "@/promisetracker/assets/hero-icon-share.svg";

import MobileChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart";
import DesktopChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart";

import RectChart from "@/promisetracker/components/Hero/ProfileChart/RectChart";

import DesktopInfoStatusPopover from "./DesktopInfoStatusPopover";
import MobileInfoStatusPopover from "./MobileInfoStatusPopover";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
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
    backgroundColor: palette.secondary.light,
    height: typography.pxToRem(50),
    marginLeft: typography.pxToRem(17),
    width: typography.pxToRem(50),
    "&:hover": {
      backgroundColor: palette.secondary.light,
    },
    [breakpoints.up("lg")]: {
      marginLeft: typography.pxToRem(20),
    },
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
    width: "100%",
  },
  divider: {
    margin: "2rem 1rem 1rem 1rem",
    height: typography.pxToRem(200),
  },
}));

function ProfileDetails({
  criteria,
  name,
  position,
  promisesByStatuses,
  ...props
}) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [clicked, setClicked] = useState(false);
  const handleOnClick = () => {
    setClicked((prev) => !prev);
  };
  const InfoStatusPopover = isDesktop
    ? DesktopInfoStatusPopover
    : MobileInfoStatusPopover;

  return (
    <>
      <Grid container className={classes.root} alignItems="center">
        <Grid item xs={6} lg={8}>
          <Hidden mdDown>
            <Typography variant="h1">{name}</Typography>
          </Hidden>
          <Typography variant="body2">
            {position} {name} <b>{promisesByStatuses.count} promises </b>at a
            glance
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          lg={4}
          container
          justify={isDesktop ? "flex-end" : "flex-start"}
          alignItems="center"
        >
          <Hidden mdDown>
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
          </Hidden>
          <InfoStatusPopover
            {...criteria}
            classes={{ iconButton: classes.iconButton }}
          />
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
      </Grid>
      <>
        {isDesktop ? (
          <div>
            {clicked ? (
              <Fade in={clicked}>
                <div className={classes.rect}>
                  <RectChart
                    totalPromises={promisesByStatuses.count}
                    inProgress={
                      promisesByStatuses.statuses["In Progress"]?.length
                    }
                    completed={promisesByStatuses.statuses.Completed?.length}
                    inconclusive={promisesByStatuses.statuses.Unrated?.length}
                    unstarted={promisesByStatuses.statuses.Unstarted?.length}
                    stalled={promisesByStatuses.statuses.Stalled?.length}
                    delayed={promisesByStatuses.statuses.Delayed?.length}
                  />
                </div>
              </Fade>
            ) : (
              <DesktopChart />
            )}
          </div>
        ) : (
          <MobileChart />
        )}
      </>
    </>
  );
}

ProfileDetails.propTypes = {
  criteria: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  promisesByStatuses: PropTypes.shape({
    count: PropTypes.number,
    statuses: PropTypes.PropTypes.shape({
      "In Progress": PropTypes.arrayOf(PropTypes.shape({})),
      Completed: PropTypes.arrayOf(PropTypes.shape({})),
      Unrated: PropTypes.arrayOf(PropTypes.shape({})),
      Unstarted: PropTypes.arrayOf(PropTypes.shape({})),
      Stalled: PropTypes.arrayOf(PropTypes.shape({})),
      Delayed: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

ProfileDetails.defaultProps = {
  criteria: undefined,
  promisesByStatuses: undefined,
};

export default ProfileDetails;
