import { Grid, Box } from "@mui/material";
import React from "react";

import NavBarNavList from "@/commons-ui/core/NavBarNavList";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const {
    logo,
    menus,
    socialLinks,
    sx,
    NextImageButton = React.Fragment,
    Link = React.Fragment,
    NavListItemProps = {},
  } = props;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
      ref={ref}
    >
      <Grid item>
        <NextImageButton
          {...logo}
          href="/"
          alt="Logo"
          width={136}
          height={61}
          priority
        />
      </Grid>
      <Grid item>
        <Box component="nav" sx={{ justifyContent: "flex-end" }}>
          <NavBarNavList
            menus={menus}
            socialLinks={socialLinks}
            direction="row"
            Component={Link}
            NavListItemProps={NavListItemProps}
          />
        </Box>
      </Grid>
    </Grid>
  );
});

export default DesktopNavBar;
