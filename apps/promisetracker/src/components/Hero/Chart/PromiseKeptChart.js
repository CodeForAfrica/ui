import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  typo: {
    textAlign: "center",
    borderBottom: "2px solid #145BD5",
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

function CircleChart() {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <div className={classes.typo}>
        <Typography variant="caption" className={classes.caption}>
          Promises kept
        </Typography>
      </div>
      <div className={classes.circleContainer}>
        <div>
          <svg width={100} height={100}>
            <circle
              cx={50}
              cy={50}
              r={50}
              fill="#145BD5"
              stroke="#1D1D1B"
              strokeWidth="1"
            />
          </svg>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h6">130</Typography>
            <Typography variant="h6">completed</Typography>
            <Typography variant="h6">25%</Typography>
          </div>
        </div>
        <div>
          <svg width={100} height={100}>
            <circle
              cx={50}
              cy={50}
              r={25}
              fill="#84C6E7"
              stroke="#1D1D1B"
              strokeWidth="1"
            />
          </svg>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h6">70</Typography>
            <Typography variant="h6">In progress</Typography>
            <Typography variant="h6">30%</Typography>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default CircleChart;
