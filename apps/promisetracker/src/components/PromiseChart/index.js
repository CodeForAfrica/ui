import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Share from "@/promisetracker/components/Share";

function PromiseChart({ chartLinks, title, description, ...props }) {
  const classes = useStyles(props);

  if (!chartLinks?.length) {
    return null;
  }
  const iframeSrcs = chartLinks.trim().split(/\s+/) || null;
  return (
    <>
      {iframeSrcs.map((iframeSrc) => (
        <Grid key={iframeSrc} className={classes.root}>
          <Grid container justify="flex-end">
            <Share link={iframeSrc} description={description} title={title} />
          </Grid>
          <iframe
            title={title}
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
