import React from "react";
import { Grid, Typography } from "@material-ui/core";

function MobileChart() {
  return (
    <>
      <Grid container item xs={12} direction="row">
        <Grid item xs={3}>
          <Typography variant="caption">Promise Kept</Typography>
        </Grid>
        <Grid item xs={9}>
          <svg width={50} height={50}>
            <circle
              cx={25}
              cy={25}
              r={10}
              fill="#145BD5"
              stroke="#1D1D1B"
              strokeWidth="1"
            />
          </svg>
        </Grid>
      </Grid>
    </>
  );
}

export default MobileChart;
