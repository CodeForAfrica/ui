import React from "react";

import { Grid } from "@material-ui/core";
import PromiseKeptChart from "@/promisetracker/components/Hero/Chart/PromiseKeptChart";
import UncertainChart from "@/promisetracker/components/Hero/Chart/UncertainChart";
import PromiseNotKeptChart from "@/promisetracker/components/Hero/Chart/PromiseNotKeptChart";

function ProfileChart() {
  return (
    <Grid
      container
      item
      direction="row"
      spacing={2}
      style={{ padding: "2rem 0rem" }}
    >
      <PromiseKeptChart />
      <UncertainChart />
      <PromiseNotKeptChart />
    </Grid>
  );
}

export default ProfileChart;
