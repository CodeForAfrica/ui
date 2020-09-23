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
          xs={9}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          style={{ borderLeft: "1px solid red" }}
        >
          <Grid item>
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
            <Typography variant="caption">130</Typography>
            <Typography variant="caption">25%</Typography>
            <Typography variant="caption">completed</Typography>
          </Grid>

          <Grid item>
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
            <Typography variant="caption">130</Typography>
            <Typography variant="caption">25%</Typography>
            <Typography variant="caption">completed</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MobileChart;
