import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  promises: {
    display: "flex",
    flexdirection: "row",
  },
}));

function MobileChart(props) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      item
      xs={12}
      classes={classes.root}
    >
      <Grid container item xs={12} justify="flex-start" alignItem="center">
        <Grid item xs={3}>
          <Typography variant="body2">Promise Kept</Typography>
        </Grid>

        <Grid
          item
          xs={8}
          container
          direction="row"
          justify="space-even"
          alignItems="center"
        >
          <Grid item>
            <svg width={50} height={50}>
              <circle
                cx={25}
                cy={25}
                r={15}
                fill="#145BD5"
                stroke="#1D1D1B"
                strokeWidth="1"
              />
            </svg>
          </Grid>

          <div>
            <Typography variant="h4">130</Typography>
          </div>

          <div>
            <Typography variant="h4">25%</Typography>
          </div>

          <div>
            <Typography variant="h4">completed</Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MobileChart;
