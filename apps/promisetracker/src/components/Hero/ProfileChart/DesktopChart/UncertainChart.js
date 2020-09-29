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

function UncertainChart({ name, ...props }) {
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
          fill="#909090"
          stroke="#1D1D1B"
          strokeWidth={1}
          currentStatusNumber={70}
          status="Delayed"
        />
        <CircleSvgChart
          fill="#EBEBEB"
          stroke="#1D1D1B"
          strokeWidth={1}
          currentStatusNumber={50}
          status="Stalled"
        />
      </div>
    </Grid>
  );
}

UncertainChart.propTypes = {
  name: PropTypes.number,
};

UncertainChart.defaultProps = {
  name: undefined,
};

export default UncertainChart;
