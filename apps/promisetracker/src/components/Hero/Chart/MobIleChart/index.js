import React from "react";

import { Grid, makeStyles } from "@material-ui/core";

import MobilePromiseKeptChart from "@/promisetracker/components/Hero/Chart/MobileChart/MobilePromiseKeptChart";
import MobilePromiseNotKeptChart from "@/promisetracker/components/Hero/Chart/MobileChart/MobilePromiseNotKeptChart";
import MobileUncertainChart from "@/promisetracker/components/Hero/Chart/MobileChart/MobileUncertainChart";

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
      spacing={3}
    >
      <MobilePromiseKeptChart name="Promise Kept" />
      <MobileUncertainChart name="Uncertain" />
      <MobilePromiseNotKeptChart name="Promise Not Kept" />
    </Grid>
  );
}
export default MobileChart;
