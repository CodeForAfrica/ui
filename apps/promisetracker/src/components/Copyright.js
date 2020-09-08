import React from "react";
import { Grid, Typography } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";

export default function Copyright() {
  return (
    <Grid style={{ padding: "1rem 0rem" }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <MuiLink color="inherit" href="https://material-ui.com/">
          Your Website
        </MuiLink>{" "}
        {new Date().getFullYear()}.
      </Typography>
    </Grid>
  );
}
