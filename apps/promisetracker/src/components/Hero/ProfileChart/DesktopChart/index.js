import React from "react";

import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

function DesktopChart({ children }) {
  return (
    <Grid
      container
      item
      direction="row"
      spacing={4}
      style={{ padding: "2rem 0rem" }}
    >
      {children}
    </Grid>
  );
}

DesktopChart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DesktopChart;
