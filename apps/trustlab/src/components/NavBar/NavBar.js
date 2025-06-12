import {
  NavBar as NavigationBar,
  Section,
  DesktopNavBar,
} from "@commons-ui/core";
import { Link, NextImageButton } from "@commons-ui/next";
import React from "react";

import CloseIcon from "@/trustlab/assets/icons/Type=x, Size=24, Color=CurrentColor.svg";
// eslint-disable-next-line import/no-unresolved
import menuIcon from "@/trustlab/assets/menu-icon.svg?url";
import { neutral } from "@/trustlab/colors";
import MobileNavBar from "@/trustlab/components/MobileNavBar";

function NavBar({ logo, menus, socialLinks }) {
  return (
    <NavigationBar
      sx={(theme) => ({
        boxShadow: "none",
        height: 64,
        borderBottom: `1px solid ${theme.palette.yellow.main}`,
      })}
    >
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <MobileNavBar
          logo={logo}
          menus={menus}
          socialLinks={socialLinks}
          menuIcon={menuIcon}
          CloseIcon={CloseIcon}
          NextImageButton={NextImageButton}
          Link={Link}
        />
        <DesktopNavBar
          logo={logo}
          menus={menus}
          socialLinks={socialLinks}
          NextImageButton={NextImageButton}
          Link={Link}
          NavListItemProps={{
            slotProps: {
              typography: {
                sx: {
                  color: neutral[400],
                  variant: "h1",
                },
              },
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
