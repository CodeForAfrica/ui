import React, { FC, ForwardRefExoticComponent, RefAttributes } from "react";

import NavBarNavList from "@/vpnmanager/components/NavBarNavList";
import NextImageButton from "@/vpnmanager/components/NextImageButton";
import { Box, Grid, Grid2Props } from "@mui/material";

interface SocialLinks {
  platform: string;
  url: string;
}

interface Menu {
  label: string;
  href: string;
}
interface Props extends Grid2Props {
  logo: any;
  menus: Menu[];
  socialLinks: SocialLinks[];
}
const DesktopNavBar: ForwardRefExoticComponent<
  Omit<Props, "ref"> & RefAttributes<HTMLDivElement>
> = React.forwardRef(function DesktopNavBar(props, ref) {
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
