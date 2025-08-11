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
import Button from "@/trustlab/components/StyledButton";

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
        sx={{
          px: { xs: 2.5, sm: 0 },
        }}
      >
        <MobileNavBar
          logo={logo}
          menus={menus}
          socialLinks={[]}
          menuIcon={menuIcon}
          CloseIcon={CloseIcon}
          NextImageButton={NextImageButton}
          Link={Link}
        >
          <Button size="large" color="#000" component={Link} href="/">
            Search
          </Button>
        </MobileNavBar>
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
            img: {
              objectFit: "contain",
            },
          }}
        >
          <Button size="large" color="#fff" component={Link} href="/">
            Search
          </Button>
        </DesktopNavBar>
      </Section>
    </NavigationBar>
  );
}

export default NavBar;
