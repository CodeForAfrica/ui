import { RichTypography } from "@commons-ui/core";
import {
  Fade,
  Grid,
  Hidden,
  IconButton,
  SvgIcon,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React, { useState } from "react";

import DesktopInfoStatusPopover from "./DesktopInfoStatusPopover";
import MobileInfoStatusPopover from "./MobileInfoStatusPopover";

import { ReactComponent as ShareIcon } from "@/promisetracker/assets/hero-icon-share (1).svg";
import viz1 from "@/promisetracker/assets/hero-icon-viz1-onclick.svg";
import viz2 from "@/promisetracker/assets/hero-icon-viz2.svg";
import DesktopChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart";
import MobileChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart";
import RectChart from "@/promisetracker/components/Hero/ProfileChart/RectChart";
import Share from "@/promisetracker/components/Share";
import config from "@/promisetracker/config";

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
  viz1: {},
  viz2: {},
  popoverContainer: {
    width: "100%",
  },
  rect: {
    padding: "2rem 0rem",
    width: "100%",
  },
  divider: {
    margin: "2rem 1rem 1rem 1rem",
    height: typography.pxToRem(200),
  },
  tagline: {
    "& .highlight": {
      color: palette.highlight.main,
    },
  },
  share: {
    fontSize: "1rem",
    textAlign: "center",
    marginLeft: "0.5rem",
    marginTop: "0.2rem",
    "&:hover": {
      cursor: "pointer",
      background: "transparent",
    },
  },
}));

function ProfileDetails({
  criteria,
  name,
  position,
  promiseLabel,
  tagline,
  trailText,
  promisesByStatus,
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
          <Hidden mdDown implementation="css">
            <RichTypography
              component="h1"
              variant="h1"
              className={classes.tagline}
            >
              {tagline || name}
            </RichTypography>
          </Hidden>
          <RichTypography component="p" variant="body2">
            {position} {name}{" "}
            <b>
              {promisesByStatus.count} {promiseLabel}{" "}
            </b>
            {trailText}
          </RichTypography>
        </Grid>
        <Grid
          item
          xs={6}
          lg={4}
          container
          justify={isDesktop ? "flex-end" : "flex-start"}
          alignItems="center"
        >
          <Hidden mdDown implementation="css">
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
                  <Image
                    src={viz1}
                    alt="Viz1"
                    className={classes.viz1}
                    width={18}
                    height={22}
                  />
                ) : (
                  <Image
                    src={viz2}
                    alt="Viz2"
                    className={classes.viz2}
                    width={18}
                    height={22}
                  />
                )}
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item>
            <InfoStatusPopover
              {...criteria}
              classes={{ iconButton: classes.iconButton }}
            />
          </Grid>
          <Grid item>
            <IconButton
              disableRipple
              disableFocusRipple
              aria-label="Share"
              size="small"
              className={classes.iconButton}
            >
              <Share
                title={`${position} ${name} ${promisesByStatus.count} ${promiseLabel} ${trailText}`}
                link={config.URL}
                classes={{
                  share: classes.share,
                }}
              >
                <SvgIcon component={ShareIcon} viewBox="0 0 20 20" />
              </Share>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {isDesktop ? (
        <div className={classes.popoverContainer}>
          {clicked ? (
            <Fade in={clicked}>
              <div className={classes.rect}>
                <RectChart
                  totalPromises={promisesByStatus.count}
                  inProgress={
                    promisesByStatus.statusHistory["In Progress"]?.length
                  }
                  completed={promisesByStatus.statusHistory.Completed?.length}
                  inconclusive={
                    promisesByStatus.statusHistory.Inconclusive?.length
                  }
                  unstarted={promisesByStatus.statusHistory.Unstarted?.length}
                  stalled={promisesByStatus.statusHistory.Stalled?.length}
                  behindSchedule={
                    promisesByStatus.statusHistory["Behind Schedule"]?.length
                  }
                />
              </div>
            </Fade>
          ) : (
            <DesktopChart promisesByStatus={promisesByStatus} />
          )}
        </div>
      ) : (
        <MobileChart promisesByStatus={promisesByStatus} />
      )}
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
  promiseLabel: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  trailText: PropTypes.string.isRequired,
  promisesByStatus: PropTypes.shape({
    count: PropTypes.number,
    statusHistory: PropTypes.PropTypes.shape({
      "In Progress": PropTypes.arrayOf(PropTypes.shape({})),
      Completed: PropTypes.arrayOf(PropTypes.shape({})),
      Inconclusive: PropTypes.arrayOf(PropTypes.shape({})),
      Unstarted: PropTypes.arrayOf(PropTypes.shape({})),
      Stalled: PropTypes.arrayOf(PropTypes.shape({})),
      "Behind Schedule": PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

ProfileDetails.defaultProps = {
  criteria: undefined,
  promisesByStatus: undefined,
  tagline: undefined,
};

export default ProfileDetails;
