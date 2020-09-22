import React from "react";

import { Grid } from "@material-ui/core";

import ProfileDetails from "@/promisetracker/components/Hero/Chart/ProfileDetails";
import ProfileChart from "@/promisetracker/components/Hero/Chart/ProfileChart";

function Chart() {
  return (
    <Grid
      container
      direction="column"
      jusify="flex-start"
      alignItems="flex-start"
      item
      xs={12}
      md={8}
    >
      <ProfileDetails name="Mike “Sonko” Mbuvi" />
      <ProfileChart />
    </Grid>
  );
}

export default Chart;
