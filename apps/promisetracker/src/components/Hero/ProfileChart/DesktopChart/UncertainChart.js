import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CircleSvgChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/CircleSvgChart";

const useStyles = makeStyles(() => ({
  root: {
    margin: "0.5rem",
  },
  typo: {
    textAlign: "center",
    borderBottom: "1px solid #909090",
  },
  caption: {
    color: "#909090",
    fontStyle: "italic",
  },
  circleContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "2rem 0rem",
  },
}));

function UncertainChart({
  name,
  inconclusive,
  totalPromises,
  unstarted,
  ...props
}) {
  const classes = useStyles(props);
  return (
    <Grid item xs={3} className={classes.root}>
      <div className={classes.typo}>
        <Typography variant="caption" className={classes.caption}>
          {name}
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
          totalPromises={totalPromises}
          currentStatusNumber={inconclusive}
          status="Inconclusive"
        />
        <CircleSvgChart
          cx="50"
          cy="50"
          size="100"
          fill="#EBEBEB"
          stroke="#1D1D1B"
          strokeWidth={1}
          totalPromises={totalPromises}
          currentStatusNumber={unstarted}
          status="Unstarted"
        />
      </div>
    </Grid>
  );
}

UncertainChart.propTypes = {
  name: PropTypes.string,
  inconclusive: PropTypes.number,
  unstarted: PropTypes.number,
  totalPromises: PropTypes.number.isRequired,
};

UncertainChart.defaultProps = {
  name: undefined,
  inconclusive: 0,
  unstarted: 0,
};

export default UncertainChart;
