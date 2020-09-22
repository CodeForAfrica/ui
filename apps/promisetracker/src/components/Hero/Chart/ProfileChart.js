import React from "react";

import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import PromiseKeptChart from "@/promisetracker/components/Hero/Chart/DesktopChart/PromiseKeptChart";
import UncertainChart from "@/promisetracker/components/Hero/Chart/DesktopChart/UncertainChart";
import PromiseNotKeptChart from "@/promisetracker/components/Hero/Chart/DesktopChart/PromiseNotKeptChart";
import MobileChart from "@/promisetracker/components/Hero/Chart/MobileChart";

function ProfileChart(props) {
  const theme = useTheme(props);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {isDesktop ? (
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
      ) : (
        <MobileChart />
      )}
    </>
  );
}

export default ProfileChart;
