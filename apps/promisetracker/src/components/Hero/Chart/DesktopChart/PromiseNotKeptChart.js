import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SvgChart from "@/promisetracker/components/Hero/Chart/DesktopChart/SvgChart";

const useStyles = makeStyles(() => ({
  typo: {
    textAlign: "center",
    borderBottom: "2px solid #FF5154",
  },
  caption: {
    color: "#FF5154",
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
    <Grid item xs={4}>
      <div className={classes.typo}>
        <Typography variant="caption" className={classes.caption}>
          {name}
        </Typography>
      </div>
      <div className={classes.circleContainer}>
        <SvgChart
          width="100"
          height="100"
          cx="50"
          cy="50"
          radius="25"
          fill="#FFB322"
          stroke="#1D1D1B"
          strokeWidth="1"
          statusNumber="30"
          status="Delayed"
          statusPercentage="15%"
        />
        <SvgChart
          width="100"
          height="100"
          cx="50"
          cy="50"
          radius="50"
          fill="#FF5154"
          stroke="#1D1D1B"
          strokeWidth="1"
          statusNumber="40"
          status="Stalled"
          statusPercentage="40%"
        />
      </div>
    </Grid>
  );
}

PromiseNotKeptChart.propTypes = {
  name: PropTypes.number,
};

PromiseNotKeptChart.defaultProps = {
  name: undefined,
};
export default PromiseNotKeptChart;
