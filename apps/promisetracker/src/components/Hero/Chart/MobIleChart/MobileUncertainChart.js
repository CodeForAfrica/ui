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
    borderRight: "1px solid #909090",
    height: "57px",
  },
}));

function MobileUncertainChart({ name, ...props }) {
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
          fill="#909090"
          stroke="1D1D1B"
          strokeWidth={1}
          statusNumber={70}
          statusPercentage="(25%)"
          status="Inconclusive"
        />
        <MobileSvgChart
          fill="#EBEBEB"
          stroke="1D1D1B"
          strokeWidth={1}
          statusNumber={50}
          statusPercentage="(18%)"
          status="Unstarted"
        />
      </Grid>
    </Grid>
  );
}

MobileUncertainChart.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MobileUncertainChart;
