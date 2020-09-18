import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
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
      </div>
    </Grid>
  );
}

export default UncertainChart;
