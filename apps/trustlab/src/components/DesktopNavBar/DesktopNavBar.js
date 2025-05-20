import { Grid, Box } from "@mui/material";
import React from "react";

import NavBarNavList from "@/trustlab/components/NavBarNavList";
import NextImageButton from "@/trustlab/components/NextImageButton";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const { logo, menus, socialLinks, sx } = props;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
      ref={ref}
    >
      <Grid>
        <NextImageButton
          {...logo}
          href="/"
          alt="Logo"
          width={136}
          height={61}
          priority
        />
      </Grid>
      <Grid>
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
