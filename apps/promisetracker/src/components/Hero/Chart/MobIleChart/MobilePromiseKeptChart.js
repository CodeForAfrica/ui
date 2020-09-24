import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MobileSvgChart from "@/promisetracker/components/Hero/Chart/MobileChart/MobileSvgChart";

const useStyles = makeStyles(() => ({
  typo: {
    color: "#005DFD",
    fontStyle: "italic",
  },
  chartGrid: {
    paddingLeft: "1rem",
  },
  border: {
    borderLeft: "1px solid #005DFD",
  },
}));

function MobilePromiseKeptChart({ name, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      item
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={4}>
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
        className={classes.border}
      >
        <MobileSvgChart
          fill="#005DFD"
          stroke="1D1D1B"
          strokeWidth="1"
          statusNumber="130"
          statusPercentage="(25%)"
          status="Completed"
        />
        <MobileSvgChart
          fill="#90DAFF"
          stroke="1D1D1B"
          strokeWidth="1"
          statusNumber="90"
          statusPercentage="(18%)"
          status="In progress"
        />
      </Grid>
    </Grid>
  );
}

MobilePromiseKeptChart.propTypes = {
  name: PropTypes.number,
};

MobilePromiseKeptChart.defaultProps = {
  name: undefined,
};

export default MobilePromiseKeptChart;
