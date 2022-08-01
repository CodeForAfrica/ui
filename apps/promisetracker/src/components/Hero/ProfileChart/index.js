import { Grid } from "@mui/material";
import React from "react";

import ProfileDetails from "@/promisetracker/components/Hero/ProfileChart/ProfileDetails";

function ProfileChart(props) {
  return (
    <Grid
      container
      direction="column"
      jusify="flex-start"
      alignItems="flex-start"
    >
      <ProfileDetails {...props} />
    </Grid>
  );
}

export default ProfileChart;
