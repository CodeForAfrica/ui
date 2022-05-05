import { Grid, IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";

import cfaLogo from "@/codeforafrica/assets/CfA logo.svg";
import menuIcon from "@/codeforafrica/assets/menu-icon.svg";

function MobileNavigation() {
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
          <Image src={cfaLogo} alt="mobile logo" />
        </IconButton>
      </Grid>
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Image src={menuIcon} alt="menu icon" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default MobileNavigation;
