import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MobileSvgChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobileSvgChart";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    padding: "2rem 0rem",
  },
  promiseKeptTypo: {
    color: "#005DFD",
    fontStyle: "italic",
    fontSize: typography.pxToRem(14),
  },
  promiseKeptBorder: {
    borderRight: "1px solid #005DFD",
    height: "57px",
  },
  uncertainTypo: {
    color: "#909090",
    fontStyle: "italic",
    fontSize: typography.pxToRem(14),
  },
  uncertainBorder: {
    borderRight: "1px solid #909090",
    height: "57px",
  },
  promiseNotKeptTypo: {
    color: "#FF5255",
    fontStyle: "italic",
    fontSize: typography.pxToRem(14),
  },
  promiseNotKeptBorder: {
    borderRight: "1px solid #FF5255",
    height: "57px",
  },
  chartGrid: {
    paddingLeft: "1rem",
  },
}));

function MobileChart({ children, ...props }) {
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
      {children}
      <Grid
        container
        item
        xs={12}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={4} className={classes.promiseKeptBorder}>
          <Typography variant="body2" className={classes.promiseKeptTypo}>
            Promise Kept
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={8}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <MobileSvgChart
            fill="#005DFD"
            stroke="1D1D1B"
            strokeWidth={1}
            statusNumber={130}
            statusPercentage="(25%)"
            status="Completed"
          />
          <MobileSvgChart
            fill="#90DAFF"
            stroke="1D1D1B"
            strokeWidth={1}
            statusNumber={90}
            statusPercentage="(18%)"
            status="In progress"
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={4} className={classes.uncertainBorder}>
          <Typography variant="body2" className={classes.uncertainTypo}>
            Uncertain
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={8}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <MobileSvgChart
            fill="#909090"
            stroke="1D1D1B"
            strokeWidth={1}
            statusNumber={70}
            statusPercentage="(14%)"
            status="Inconclusive"
          />
          <MobileSvgChart
            fill="#EBEBEB"
            stroke="1D1D1B"
            strokeWidth={1}
            statusNumber={50}
            statusPercentage="(10%)"
            status="Unstarted"
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={4} className={classes.promiseNotKeptBorder}>
          <Typography variant="body2" className={classes.promiseNotKeptTypo}>
            Promise Not Kept
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={8}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <MobileSvgChart
            fill="#FFB322"
            stroke="1D1D1B"
            strokeWidth={1}
            statusNumber={60}
            statusPercentage="(12%)"
            status="Delayed"
          />
          <MobileSvgChart
            fill="#FF5255"
            stroke="1D1D1B"
            strokeWidth={1}
            statusNumber={110}
            statusPercentage="(22%)"
            status="Stalled"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

MobileChart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MobileChart;
