import { Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ProgressChart from "@/promisetracker/components/Hero/ProfileChart/DesktopChart/ProgressChart";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    padding: "1.5rem 0rem",
    height: typography.pxToRem(284),
    maxHeight: "100%",
    width: "54.1875rem",
  },
  promiseGrid: {
    margin: "0.5rem",
  },
  circleContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "2rem 0rem",
  },
  divider: {
    margin: "2rem 1rem 1rem 1rem",
    height: typography.pxToRem(200),
  },
}));

function DesktopChart(props) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      item
      direction="row"
      justify="flex-start"
      className={classes.root}
    >
      <ProgressChart
        color="#145BD5"
        borderBottom="1px solid #145BD5"
        caption="Promise kept"
        totalPromises={promisesByStatus.count}
        progressStatuses={[
          {
            color: "#005DFD",
            count: promisesByStatus.statusHistory.Complete?.length,
            title: "Complete",
          },
          {
            color: "#90DAFF",
            count: 90,
            title: "In Progress",
          },
        ]}
      />
      <Divider orientation="vertical" className={classes.divider} />
      <ProgressChart
        color="#909090"
        borderBottom="1px solid #909090"
        caption="Uncertain"
        progressStatuses={[
          {
            color: "#909090",
            count: promisesByStatus.statusHistory.Inconclusive?.length,
            title: "Inconclusive",
          },
          {
            color: "#EBEBEB",
            count: 50,
            title: "Unstarted",
          },
        ]}
      />

      <Divider orientation="vertical" className={classes.divider} />
      <ProgressChart
        color="#FF5255"
        borderBottom="1px solid #FF5255"
        caption="Promise not kept"
        totalPromises={promisesByStatus.count}
        progressStatuses={[
          {
            color: "#FFB322",
            count: promisesByStatus.statusHistory["Behind Schedule"]?.length,
            title: "Behind Schedule",
          },
          {
            color: "#FF5154",
            count: 110,
            title: "Stalled",
          },
        ]}
      />
    </Grid>
  );
}

DesktopChart.propTypes = {
  promisesByStatus: PropTypes.shape({
    count: PropTypes.number,
    statusHistory: PropTypes.PropTypes.shape({
      "In Progress": PropTypes.arrayOf(PropTypes.shape({})),
      Complete: PropTypes.arrayOf(PropTypes.shape({})),
      Inconclusive: PropTypes.arrayOf(PropTypes.shape({})),
      Unstarted: PropTypes.arrayOf(PropTypes.shape({})),
      Stalled: PropTypes.arrayOf(PropTypes.shape({})),
      "Behind Schedule": PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

DesktopChart.defaultProps = {
  promisesByStatus: undefined,
};

export default DesktopChart;
