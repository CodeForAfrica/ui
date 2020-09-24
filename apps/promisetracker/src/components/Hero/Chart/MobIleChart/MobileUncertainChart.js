import React from "react";

import PropTypes from "prop-types";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MobileSvgChart from "@/promisetracker/components/Hero/Chart/MobileChart/MobileSvgChart";

const useStyles = makeStyles(() => ({
  typo: {
    color: "#909090",
    fontStyle: "italic",
  },
  chartGrid: {
    paddingLeft: "1rem",
  },
  border: {
    borderLeft: "1px solid #909090",
  },
}));

function MobileUncertainChart({ name, ...props }) {
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
          fill="#909090"
          stroke="1D1D1B"
          strokeWidth="1"
          statusNumber="130"
          statusPercentage="(25%)"
          status="Inconclusive"
        />
        <MobileSvgChart
          fill="#EBEBEB"
          stroke="1D1D1B"
          strokeWidth="1"
          statusNumber="90"
          statusPercentage="(18%)"
          status="Unstarted"
        />
      </Grid>
    </Grid>
  );
}

MobileUncertainChart.propTypes = {
  name: PropTypes.number,
};

MobileUncertainChart.defaultProps = {
  name: undefined,
};

export default MobileUncertainChart;
