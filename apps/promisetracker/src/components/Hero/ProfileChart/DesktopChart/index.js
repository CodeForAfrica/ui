import React from "react";

import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    padding: "1.5rem 0rem",
    height: typography.pxToRem(284),
    maxHeight: "100%",
  },
}));

function DesktopChart({ children, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid container item direction="row" spacing={4} className={classes.root}>
      {children}
    </Grid>
  );
}

DesktopChart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DesktopChart;
