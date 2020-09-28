import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import SvgChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/SvgChart";

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
        <SvgChart
          width="100"
          height="100"
          cx="50"
          cy="50"
          radius="45"
          fill="#145BD5"
          stroke="#1D1D1B"
          strokeWidth={1}
          statusNumber={130}
          status="Completed"
          statusPercentage="25%"
        />
        <SvgChart
          width="100"
          height="100"
          cx="50"
          cy="50"
          radius="30"
          fill="#84C6E7"
          stroke="#1D1D1B"
          strokeWidth={1}
          statusNumber={90}
          status="In Progress"
          statusPercentage="18%"
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
