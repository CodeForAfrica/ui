import {
  NavBar as NavigationBar,
  Section,
  DesktopNavBar,
} from "@commons-ui/core";
import { Link, NextImageButton } from "@commons-ui/next";
import { Box } from "@mui/material";
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
          socialLinks={socialLinks}
          menuIcon={menuIcon}
          CloseIcon={CloseIcon}
          NextImageButton={NextImageButton}
          Link={Link}
        >
          <Box>
            <Button
              size="large"
              color="#000"
              sx={{ mb: 2 }}
              component={Link}
              href="/"
            >
              {searchButtonLabel}
            </Button>
          </Box>
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
            color: "common.white",
            img: {
              objectFit: "contain",
            },
          }}
        >
          <Button
            sx={{ mr: 2 }}
            size="large"
            color="#fff"
            component={Link}
            href="/"
          >
            {searchButtonLabel}
          </Button>
        </DesktopNavBar>
      </Section>
    </NavigationBar>
  );
}

export default NavBar;
