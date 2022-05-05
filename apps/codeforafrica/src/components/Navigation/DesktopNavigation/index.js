import { Grid, IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";

import cfaLogo from "@/codeforafrica/assets/CfA logo.svg";

function DesktopNavigation() {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      direction="row"
    >
      <Grid item xs={4}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Image src={cfaLogo} alt="desktop logo" />
        </IconButton>
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        this is the menulist
      </Grid>
    </Grid>
  );
}

export default DesktopNavigation;
