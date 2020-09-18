import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
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
  h6: {
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.pxToRem(24),
  },
  h4: {
    fontSize: typography.pxToRem(12),
    textTransform: "Capitalize",
    fontWeight: "normal",
  },
  percentage: {
    fontSize: typography.pxToRem(12),
    fontWeight: "normal",
    color: "#909090",
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
          <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
            <Typography variant="h6" className={classes.h6}>
              130
            </Typography>
            <Typography variant="h4" className={classes.h4}>
              Completed
            </Typography>
            <Typography variant="h6" className={classes.percentage}>
              25%
            </Typography>
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
          <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
            <Typography variant="h6" className={classes.h6}>
              70
            </Typography>
            <Typography variant="h4" className={classes.h4}>
              In progress
            </Typography>
            <Typography variant="h6" className={classes.percentage}>
              30%
            </Typography>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default CircleChart;
