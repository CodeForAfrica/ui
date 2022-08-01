import { Grid, Typography, Link as MuiLink } from "@mui/material";
import React from "react";

export default function Copyright() {
  return (
    <Grid style={{ padding: "1rem 0rem" }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <MuiLink
          color="inherit"
          href="https://material-ui.com/"
          underline="hover"
        >
          Your Website
        </MuiLink>{" "}
        {new Date().getFullYear()}.
      </Typography>
    </Grid>
  );
}
