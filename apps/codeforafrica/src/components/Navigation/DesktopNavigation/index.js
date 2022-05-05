import { Grid } from "@mui/material";
import React from "react";

import cfaLogo from "@/codeforafrica/assets/CfA logo.svg";
import Logo from "@/codeforafrica/components/Logo";

function DesktopNavigation() {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      direction="row"
    >
      <Grid item xs={4}>
        <Logo src={cfaLogo} alt="Logo" />
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        NAV MENULIST
      </Grid>
    </Grid>
  );
}

export default DesktopNavigation;
