import React from "react";

import { Grid } from "@material-ui/core";
import PromiseKeptChart from "@/promisetracker/components/Hero/Chart/PromiseKeptChart";
import UncertainChart from "@/promisetracker/components/Hero/Chart/UncertainChart";
import PromiseNotKeptChart from "@/promisetracker/components/Hero/Chart/PromiseNotKeptChart";

function ProfileChart() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      item
      spacing={5}
    >
      <PromiseKeptChart />
      <UncertainChart />
      <PromiseNotKeptChart />
    </Grid>
  );
}

export default ProfileChart;
