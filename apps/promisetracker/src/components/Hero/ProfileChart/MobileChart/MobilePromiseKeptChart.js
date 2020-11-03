import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MobileSvgChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobileSvgChart";

const useStyles = makeStyles(({ typography }) => ({
  typo: {
    color: "#005DFD",
    fontStyle: "italic",
    fontSize: typography.pxToRem(14),
  },
  chartGrid: {
    paddingLeft: "1rem",
  },
  border: {
    borderRight: "1px solid #005DFD",
    height: "57px",
  },
}));

function MobilePromiseKeptChart({
  completed,
  inProgress,
  name,
  totalPromises,
  ...props
}) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={4} className={classes.border}>
        <Typography variant="body2" className={classes.typo}>
          {name}
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
          statusNumber={completed}
          statusPercentage={`(${(completed * 100) / totalPromises}%)`}
          status="Completed"
        />
        <MobileSvgChart
          fill="#90DAFF"
          stroke="1D1D1B"
          strokeWidth={1}
          statusNumber={inProgress}
          statusPercentage={`(${(inProgress * 100) / totalPromises}%)`}
          status="In progress"
        />
      </Grid>
    </Grid>
  );
}

MobilePromiseKeptChart.propTypes = {
  name: PropTypes.string.isRequired,
  completed: PropTypes.number,
  inProgress: PropTypes.number,
  totalPromises: PropTypes.number.isRequired,
};

MobilePromiseKeptChart.defaultProps = {
  completed: 0,
  inProgress: 0,
};

export default MobilePromiseKeptChart;
