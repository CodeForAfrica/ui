import React from "react";

import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

function MobileChart({ children }) {
  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      justify="flex-start"
      alignItems="flex-start"
      spacing={3}
    >
      {children}
    </Grid>
  );
}

MobileChart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MobileChart;
