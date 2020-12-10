import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import Share from "@/promisetracker/components/Share";

import useStyles from "./useStyles";

function PromiseChart({ chartLink, title, description }) {
  const classes = useStyles();

  const iframeSrc = chartLink || null;

  return (
    <Grid className={classes.root}>
      <Grid container justify="flex-end">
        <Share link={chartLink} description={description} title={title} />
      </Grid>
      <iframe
        title="Promise chart"
        className={classes.chartStyles}
        src={iframeSrc}
      />
    </Grid>
  );
}

PromiseChart.propTypes = {
  chartLink: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

PromiseChart.defaultProps = {
  chartLink: null,
  title: PropTypes.title,
  description: PropTypes.description,
};

export default PromiseChart;
