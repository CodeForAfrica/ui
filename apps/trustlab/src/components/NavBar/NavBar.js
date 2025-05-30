import {
  NavBar as NavigationBar,
  Section,
  DesktopNavBar,
  MobileNavBar,
} from "@commons-ui/core";
import { Link, NextImageButton } from "@commons-ui/next";
import React from "react";

import CloseIcon from "@/trustlab/assets/icons/Type=x, Size=24, Color=CurrentColor.svg";
// eslint-disable-next-line import/no-unresolved
import menuIcon from "@/trustlab/assets/menu-icon.svg?url";
import { neutral } from "@/trustlab/colors";

function NavBar({ logo, menus, socialLinks }) {
  return (
    <NavigationBar sx={{ py: { xs: "10px", md: "15.5" } }}>
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <MobileNavBar
          logo={logo}
          menus={menus}
          socialLinks={socialLinks}
          menuIcon={menuIcon}
          CloseIcon={CloseIcon}
          NextImageButton={NextImageButton}
          Link={Link}
          NavListItemProps={{
            sx: {
              color: "#000000",
              variant: "h3",
            },
          }}
          DialogProps={{
            sx: {
              "& .MuiDialogContent-root": {
                backgroundColor: "#FFFFFF",
              },
            },
          }}
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        />
        <DesktopNavBar
          logo={logo}
          menus={menus}
          socialLinks={socialLinks}
          NextImageButton={NextImageButton}
          Link={Link}
          NavListItemProps={{
            sx: {
              color: neutral[400],
              variant: "h1",
            },
          }}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        />
      </Section>
    </NavigationBar>
  );
}

export default NavBar;
