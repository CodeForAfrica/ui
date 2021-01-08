import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import Share from "@/promisetracker/components/Share";

import useStyles from "./useStyles";

function PromiseChart({ chartLinks, title, description }) {
  const classes = useStyles();

  const iframeSrcs = chartLinks.trim().split(/\s+/) || null;

  return (
    <>
      {iframeSrcs &&
        iframeSrcs.map((iframeSrc) => (
          <Grid className={classes.root}>
            <Grid container justify="flex-end">
              <Share link={iframeSrc} description={description} title={title} />
            </Grid>
            <iframe
              title="Promise chart"
              className={classes.chartStyles}
              src={iframeSrc}
            />
          </Grid>
        ))}
    </>
  );
}

PromiseChart.propTypes = {
  chartLinks: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

PromiseChart.defaultProps = {
  chartLinks: null,
  title: PropTypes.title,
  description: PropTypes.description,
};

export default PromiseChart;
