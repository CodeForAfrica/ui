import { Box, Grid, Grid2Props } from "@mui/material";
import React, { ForwardedRef } from "react";

import NavBarNavList from "@/roboshield/components/NavBarNavList";
import NextImageButton from "@/roboshield/components/NextImageButton";
import type { SocialMediaLink } from "@/roboshield/components/SocialMediaLinkIcon";

interface Menu {
  label: string;
  href: string;
}
interface Props extends Grid2Props {
  logo: any;
  menus: Menu[];
  socialLinks: SocialMediaLink[];
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
