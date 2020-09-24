import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

function MobileChart(props) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
    >
      <Grid
        container
        item
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={4}>
          <Typography variant="caption">Promise Kept</Typography>
        </Grid>

        <Grid
          container
          item
          xs={8}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          style={{ borderLeft: "1px solid red" }}
        >
          <Grid container direction="row" item style={{ paddingLeft: "1rem" }}>
            <Grid item xs={3}>
              <svg width={25} height={25}>
                <circle
                  cx={12.5}
                  cy={12.5}
                  r={10}
                  fill="blue"
                  stroke="black"
                  strokeWidth="1"
                />
              </svg>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption">130</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption">25%</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption">completed</Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" item style={{ paddingLeft: "1rem" }}>
            <Grid item xs={3}>
              <svg width={25} height={25}>
                <circle
                  cx={12.5}
                  cy={12.5}
                  r={10}
                  fill="blue"
                  stroke="black"
                  strokeWidth="1"
                />
              </svg>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption">130</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption">25%</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption">completed</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MobileChart;
