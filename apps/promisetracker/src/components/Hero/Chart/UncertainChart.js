import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  typo: {
    textAlign: "center",
    borderBottom: "2px solid #909090",
  },
  caption: {
    color: "#909090",
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

function UncertainChart() {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <div className={classes.typo}>
        <Typography variant="caption" className={classes.caption}>
          Uncertain
        </Typography>
      </div>
      <div className={classes.circleContainer}>
        <div>
          <svg width={100} height={100}>
            <circle
              cx={45}
              cy={45}
              r={30}
              fill="#909090"
              stroke="#1D1D1B"
              strokeWidth="1"
            />
          </svg>
          <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
            <Typography variant="h6" className={classes.h6}>
              35
            </Typography>
            <Typography variant="h6" className={classes.h4}>
              inconclusive
            </Typography>
            <Typography variant="caption" className={classes.percentage}>
              60%
            </Typography>
          </div>
        </div>
        <div>
          <svg width={100} height={100}>
            <circle
              cx={45}
              cy={45}
              r={20}
              fill="#EBEBEB"
              stroke="#1D1D1B"
              strokeWidth="1"
            />
          </svg>
          <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
            <Typography variant="h6" className={classes.h6}>
              50
            </Typography>
            <Typography variant="h4" className={classes.h4}>
              unstarted
            </Typography>
            <Typography variant="caption" className={classes.percentage}>
              25%
            </Typography>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default UncertainChart;
