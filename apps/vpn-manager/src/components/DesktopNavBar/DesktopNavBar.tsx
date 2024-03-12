import { Grid, Box, Grid2Props } from "@mui/material";
import React, { FC } from "react";

import NavBarNavList from "@/vpn-manager/components/NavBarNavList";
import NextImageButton from "@/vpn-manager/components/NextImageButton";

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
const DesktopNavBar: FC<Props> = React.forwardRef(
  function DesktopNavBar(props, ref) {
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
  },
);

export default DesktopNavBar;
