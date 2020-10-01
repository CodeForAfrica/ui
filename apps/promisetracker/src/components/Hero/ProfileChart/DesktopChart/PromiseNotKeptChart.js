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
    borderBottom: "1px solid #FF5154",
  },
  caption: {
    color: "#FF5154",
    fontStyle: "italic",
  },
  circleContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "2rem 0rem",
  },
}));

function PromiseNotKeptChart({ name, ...props }) {
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
  );
}

PromiseNotKeptChart.propTypes = {
  name: PropTypes.string,
};

PromiseNotKeptChart.defaultProps = {
  name: undefined,
};
export default PromiseNotKeptChart;
