import React from "react";

import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "2rem 0rem",
  },
}));

function MobileChart({ children, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      justify="flex-start"
      alignItems="flex-start"
      spacing={3}
      className={classes.root}
    >
      {children}
    </Grid>
  );
}

MobileChart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MobileChart;
