import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ProgressChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/ProgressChart";

const useStyles = makeStyles(() => ({
  root: {
    padding: "2rem 0rem",
  },
  chartGrid: {
    paddingLeft: "1rem",
  },
}));

function MobileChart({ ...props }) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      justify="flex-start"
      alignItems="flex-start"
      spacing={3}
      className={classes.root}
    >
      <ProgressChart
        color="#005DFD"
        borderRight="1px solid #005DFD"
        caption="Promise Kept"
        progressStatuses={[
          {
            color: "#005DFD",
            count: 130,
            title: "Completed",
            percentage: "(25%)",
          },
          {
            color: "#90DAFF",
            count: 90,
            title: "In progress",
            percentage: "(18%)",
          },
        ]}
      />

      <ProgressChart
        color="#909090"
        borderRight="1px solid #909090"
        caption="Promise Kept"
        progressStatuses={[
          {
            color: "#909090",
            count: 70,
            title: "Inconclusive",
            percentage: "(14%)",
          },
          {
            color: "#EBEBEB",
            count: 50,
            title: "Unstarted",
            percentage: "(10%)",
          },
        ]}
      />

      <ProgressChart
        color="#FF5255"
        borderRight="1px solid #FF5255"
        caption="Promise Not Kept"
        progressStatuses={[
          {
            color: "#FFB322",
            count: 60,
            title: "Delayed",
            percentage: "(12%)",
          },
          {
            color: "#FF5255",
            count: 110,
            title: "Stalled",
            percentage: "(22%)",
          },
        ]}
      />
    </Grid>
  );
}

export default MobileChart;
