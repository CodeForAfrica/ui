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
    borderBottom: "1px solid #145BD5",
  },
  caption: {
    color: "#145BD5",
    fontStyle: "italic",
  },
  circleContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "2rem 0rem",
  },
}));

function PromiseKeptChart({ name, ...props }) {
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
          fill="#145BD5"
          stroke="#1D1D1B"
          strokeWidth={1}
          currentStatusNumber={130}
          status="Completed"
        />
        <CircleSvgChart
          fill="#84C6E7"
          stroke="#1D1D1B"
          strokeWidth={1}
          currentStatusNumber={90}
          status="In Progress"
        />
      </div>
    </Grid>
  );
}

PromiseKeptChart.propTypes = {
  name: PropTypes.number,
};

PromiseKeptChart.defaultProps = {
  name: undefined,
};

export default PromiseKeptChart;
