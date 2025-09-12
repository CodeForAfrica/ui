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

function NavBar({ logo, menus, searchButtonLabel = "Search", socialLinks }) {
  return (
    <NavigationBar
      sx={{
        boxShadow: "none",
        height: 94,
        borderBottom: `1px solid ${grey[900]}`,
        backgroundColor: "common.black",
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
          socialLinks={socialLinks}
          menuIcon={menuIcon}
          CloseIcon={CloseIcon}
          NextImageButton={NextImageButton}
          Link={Link}
        >
          <Button
            size="large"
            color="#000"
            sx={{ mb: 2, maxWidth: "fit-content" }}
            component={Link}
            bgcolor="#fff"
            href="/"
          >
            {searchButtonLabel}
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
                  "&:hover": {
                    color: "common.white",
                  },
                  "&.active": {
                    color: "common.white",
                  },
                },
              },
            },
          }}
          sx={{
            display: { xs: "none", md: "flex" },
            color: "common.white",
            height: 94,
            img: {
              objectFit: "contain",
            },
          }}
        >
          <Button
            sx={{
              // Hide Search button. Hide since search design is not available yet
              display: "none",
              mr: 2,
              "&:last-child": {
                marginRight: 0,
              },
            }}
            color="#fff"
            component={Link}
            href="/"
            size="large"
            bgcolor="#000"
          >
            {searchButtonLabel}
          </Button>
        </DesktopNavBar>
      </Section>
    </NavigationBar>
  );
}

export default NavBar;
