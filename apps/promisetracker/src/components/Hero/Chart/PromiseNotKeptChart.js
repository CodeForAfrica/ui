import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

function PromiseNotKeptChart() {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <div className={classes.typo}>
        <Typography variant="caption" className={classes.caption}>
          Promise not kept
        </Typography>
      </div>
      <div className={classes.circleContainer}>
        <div>
          <svg width={100} height={100}>
            <circle
              cx={50}
              cy={50}
              r={25}
              fill="#FFB322"
              stroke="#1D1D1B"
              strokeWidth="1"
            />
          </svg>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h6">30</Typography>
            <Typography variant="h6">delayed</Typography>
            <Typography variant="h6">10%</Typography>
          </div>
        </div>

        <div>
          <svg width={100} height={100}>
            <circle
              cx={50}
              cy={50}
              r={50}
              fill="#FF5154"
              stroke="#1D1D1B"
              strokeWidth="1"
            />
          </svg>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h6">40</Typography>
            <Typography variant="h6">stalled</Typography>
            <Typography variant="h6">40%</Typography>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default PromiseNotKeptChart;
