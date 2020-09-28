import React from "react";

import { Grid } from "@material-ui/core";

import ProfileDetails from "@/promisetracker/components/Hero/ProfileChart/ProfileDetails";

function ProfileChart() {
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
    </Grid>
  );
}

export default ProfileChart;
