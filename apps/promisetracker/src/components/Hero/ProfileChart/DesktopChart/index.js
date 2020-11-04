import React from "react";

import PropTypes from "prop-types";

import { Grid, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CircleSvgChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/CircleSvgChart";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    padding: "1.5rem 0rem",
    height: typography.pxToRem(284),
    maxHeight: "100%",
    width: "54.1875rem",
  },
  promiseGrid: {
    margin: "0.5rem",
  },
  promiseKeptTypo: {
    textAlign: "center",
    borderBottom: "1px solid #145BD5",
  },
  uncertainTypo: {
    textAlign: "center",
    borderBottom: "1px solid #909090",
  },
  promiseNotKeptTypo: {
    textAlign: "center",
    borderBottom: "1px solid #FF5154",
  },
  promiseKeptCaption: {
    color: "#145BD5",
    fontStyle: "italic",
  },
  uncertainCaption: {
    color: "#909090",
    fontStyle: "italic",
  },
  promiseNotKeptCaption: {
    color: "#FF5154",
    fontStyle: "italic",
  },
  circleContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "2rem 0rem",
  },
  divider: {
    margin: "2rem 1rem 1rem 1rem",
    height: typography.pxToRem(200),
  },
}));

function DesktopChart({ children, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      item
      direction="row"
      justify="flex-start"
      className={classes.root}
    >
      {children}
      <Grid item xs={3} className={classes.promiseGrid}>
        <div className={classes.promiseKeptTypo}>
          <Typography variant="caption" className={classes.promiseKeptCaption}>
            Promises Kept
          </Typography>
        </div>
        <div className={classes.circleContainer}>
          <CircleSvgChart
            cx="50"
            cy="50"
            size="100"
            fill="#145BD5"
            stroke="#1D1D1B"
            strokeWidth={1}
            currentStatusNumber={130}
            status="Completed"
          />
          <CircleSvgChart
            cx="50"
            cy="50"
            size="100"
            fill="#84C6E7"
            stroke="#1D1D1B"
            strokeWidth={1}
            currentStatusNumber={90}
            status="In Progress"
          />
        </div>
      </Grid>

      <Divider orientation="vertical" className={classes.divider} />

      <Grid item xs={3} className={classes.promiseGrid}>
        <div className={classes.uncertainTypo}>
          <Typography variant="caption" className={classes.uncertainCaption}>
            Uncertain
          </Typography>
        </div>
        <div className={classes.circleContainer}>
          <CircleSvgChart
            cx="50"
            cy="50"
            size="100"
            fill="#909090"
            stroke="#1D1D1B"
            strokeWidth={1}
            currentStatusNumber={70}
            status="Inconclusive"
          />
          <CircleSvgChart
            cx="50"
            cy="50"
            size="100"
            fill="#EBEBEB"
            stroke="#1D1D1B"
            strokeWidth={1}
            currentStatusNumber={50}
            status="Unstarted"
          />
        </div>
      </Grid>

      <Divider orientation="vertical" className={classes.divider} />

      <Grid item xs={3} className={classes.promiseGrid}>
        <div className={classes.promiseNotKeptTypo}>
          <Typography
            variant="caption"
            className={classes.promiseNotKeptCaption}
          >
            Promises Not Kept
          </Typography>
        </div>
        <div className={classes.circleContainer}>
          <CircleSvgChart
            cx="50"
            cy="50"
            size="100"
            fill="#FFB322"
            stroke="#1D1D1B"
            strokeWidth={1}
            currentStatusNumber={60}
            status="Delayed"
          />
          <CircleSvgChart
            cx="50"
            cy="50"
            size="100"
            fill="#FF5154"
            stroke="#1D1D1B"
            strokeWidth={1}
            currentStatusNumber={110}
            status="Stalled"
          />
        </div>
      </Grid>
    </Grid>
  );
}

DesktopChart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DesktopChart;
