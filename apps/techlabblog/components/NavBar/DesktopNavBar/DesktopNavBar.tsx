import { Box, Grid } from "@mui/material";
import React from "react";

import Logo from "@/techlabblog/components/Logo";
import type NavBarProps from "@/techlabblog/components/NavBar/NavBarProps";
import NavBarNavList from "@/techlabblog/components/NavBarNavList";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(
  props: NavBarProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { logo, menus, socialLinks, sx } = props;

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
      <Grid item>
        <Box component="nav" sx={{ justifyContent: "flex-end" }}>
          <NavBarNavList
            menus={menus}
            socialLinks={socialLinks}
            direction="row"
          />
        </Box>
      </Grid>
    </Grid>
  );
});

export default DesktopNavBar;
