import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MobileSvgChart from "@/promisetracker/components/Hero/ProfileChart/MobileChart/MobileSvgChart";

const useStyles = makeStyles(({ typography }) => ({
  typo: {
    color: "#909090",
    fontStyle: "italic",
    fontSize: typography.pxToRem(14),
  },
  chartGrid: {
    paddingLeft: "1rem",
  },
  border: {
    borderRight: "1px solid #909090",
    height: "57px",
  },
}));

function MobileUncertainChart({
  name,
  inconclusive,
  totalPromises,
  unstarted,
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
          fill="#909090"
          stroke="1D1D1B"
          strokeWidth={1}
          statusNumber={inconclusive}
          statusPercentage={`(${(inconclusive * 100) / totalPromises}%)`}
          status="Inconclusive"
        />
        <MobileSvgChart
          fill="#EBEBEB"
          stroke="1D1D1B"
          strokeWidth={1}
          statusNumber={unstarted}
          statusPercentage={`(${(unstarted * 100) / totalPromises}%)`}
          status="Unstarted"
        />
      </Grid>
    </Grid>
  );
}

MobileUncertainChart.propTypes = {
  name: PropTypes.string.isRequired,
  inconclusive: PropTypes.number,
  unstarted: PropTypes.number,
  totalPromises: PropTypes.number.isRequired,
};

MobileUncertainChart.defaultProps = {
  inconclusive: 0,
  unstarted: 0,
};

export default MobileUncertainChart;
