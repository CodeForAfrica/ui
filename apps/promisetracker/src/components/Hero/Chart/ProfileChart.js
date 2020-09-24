import React from "react";

import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import PromiseKeptChart from "@/promisetracker/components/Hero/Chart/DesktopChart/PromiseKeptChart";
import UncertainChart from "@/promisetracker/components/Hero/Chart/DesktopChart/UncertainChart";
import PromiseNotKeptChart from "@/promisetracker/components/Hero/Chart/DesktopChart/PromiseNotKeptChart";
import MobileChart from "@/promisetracker/components/Hero/Chart/MobileChart";

import MobilePromiseKeptChart from "@/promisetracker/components/Hero/Chart/MobileChart/MobilePromiseKeptChart";
import MobilePromiseNotKeptChart from "@/promisetracker/components/Hero/Chart/MobileChart/MobilePromiseNotKeptChart";
import MobileUncertainChart from "@/promisetracker/components/Hero/Chart/MobileChart/MobileUncertainChart";

function ProfileChart(props) {
  const theme = useTheme(props);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {isDesktop ? (
        <Grid container item direction="row" spacing={4}>
          <PromiseKeptChart name="Promises Kept" />
          <UncertainChart name="Uncertain" />
          <PromiseNotKeptChart name="Promises Not Kept" />
        </Grid>
      ) : (
        <MobileChart>
          <MobilePromiseKeptChart name="Promise Kept" />
          <MobileUncertainChart name="Uncertain" />
          <MobilePromiseNotKeptChart name="Promise Not Kept" />
        </MobileChart>
      )}
    </>
  );
}

export default ProfileChart;
