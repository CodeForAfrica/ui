import { Grid } from "@mui/material";
import React from "react";

import Logo from "@/engineeringblog/components/Logo";
import type NavBarProps from "@/engineeringblog/components/NavBar/NavBarProps";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(
  props: NavBarProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { logo, sx } = props;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
      ref={ref}
    >
      <Grid item>
        <Logo {...logo} />
      </Grid>
    </Grid>
  );
});

export default DesktopNavBar;
