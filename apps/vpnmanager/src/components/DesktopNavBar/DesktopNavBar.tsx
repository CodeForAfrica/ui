import React, { ForwardedRef } from "react";

import { Box, Grid, Grid2Props, SxProps } from "@mui/material";

import type {
  Menu,
  SocialMediaLink,
} from "@/vpnmanager/components/NavBarNavList";
import NavBarNavList from "@/vpnmanager/components/NavBarNavList";
import NextImageButton from "@/vpnmanager/components/NextImageButton";

interface Props extends Grid2Props {
  logo: any;
  menus: Menu[];
  socialLinks: SocialMediaLink[];
  sx?: SxProps;
}

const DesktopNavBar = React.forwardRef(function DesktopNavBar(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>,
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
          />
        </Box>
      </Grid>
    </Grid>
  );
});

export default DesktopNavBar;
