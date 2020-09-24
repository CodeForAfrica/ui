import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MobileSvgChart from "@/promisetracker/components/Hero/Chart/MobileChart/MobileSvgChart";

const useStyles = makeStyles(() => ({
  typo: {
    color: "#FF5255",
    fontStyle: "italic",
  },
  chartGrid: {
    paddingLeft: "1rem",
  },
  border: {
    borderRight: "1px solid #FF5255",
    height: "57px",
  },
}));

function MobilePromiseNotKeptChart({ name, ...props }) {
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
      <Grid item xs={3} className={classes.border}>
        <Typography variant="body2" className={classes.typo}>
          {name}
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={9}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <MobileSvgChart
          fill="#FFB322"
          stroke="1D1D1B"
          strokeWidth="1"
          statusNumber="130"
          statusPercentage="(25%)"
          status="Delayed"
        />
        <MobileSvgChart
          fill="#FF5255"
          stroke="1D1D1B"
          strokeWidth="1"
          statusNumber="90"
          statusPercentage="(18%)"
          status="Stalled"
        />
      </Grid>
    </Grid>
  );
}

MobilePromiseNotKeptChart.propTypes = {
  name: PropTypes.number,
};

MobilePromiseNotKeptChart.defaultProps = {
  name: undefined,
};

export default MobilePromiseNotKeptChart;
