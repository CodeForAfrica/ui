import React from "react";

import { Grid } from "@material-ui/core";
import PromiseKeptChart from "@/promisetracker/components/Hero/Chart/DesktopChart/PromiseKeptChart";
import UncertainChart from "@/promisetracker/components/Hero/Chart/DesktopChart/UncertainChart";
import PromiseNotKeptChart from "@/promisetracker/components/Hero/Chart/DesktopChart/PromiseNotKeptChart";

function ProfileChart() {
  return (
    <Grid
      container
      item
      direction="row"
      spacing={2}
      style={{ padding: "2rem 0rem", position: "relative" }}
    >
      <PromiseKeptChart />
      <UncertainChart />
      <PromiseNotKeptChart />
    </Grid>
  );
}

export default ProfileChart;
