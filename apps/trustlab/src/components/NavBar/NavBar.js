import {
  NavBar as NavigationBar,
  Section,
  DesktopNavBar,
} from "@commons-ui/core";
import { Link, NextImageButton } from "@commons-ui/next";
import React from "react";

import CloseIcon from "@/trustlab/assets/icons/Type=x, Size=24, Color=CurrentColor.svg";
/* eslint-disable-next-line import/no-unresolved */
import menuIcon from "@/trustlab/assets/menu-icon.svg?url";
import { grey } from "@/trustlab/colors";
import MobileNavBar from "@/trustlab/components/MobileNavBar";

function NavBar({ logo, menus, socialLinks }) {
  return (
    <NavigationBar
      sx={{
        boxShadow: "none",
        height: 64,
        borderBottom: `1px solid ${grey[900]}`,
        backgroundColor: grey[900],
      }}
    >
      <Section
        sx={(theme) => ({
          px: { xs: 2.5, sm: 0 },
          maxWidth: {
            xs: "100%",
            sm: theme.breakpoints.values.sm,
            md: theme.breakpoints.values.sm,
            lg: theme.breakpoints.values.sm,
            xl: theme.breakpoints.values.sm,
          },
        })}
      >
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
                  color: "common.white",
                  variant: "p3",
                  "&:hover": {
                    color: "common.white",
                  },
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
