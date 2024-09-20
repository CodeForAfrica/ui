"use client";

import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import {
  AppBarProps,
  ToolbarProps,
  alpha,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import React from "react";

import type NavBarProps from "@/techlabblog/components/NavBar/NavBarProps";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

interface ScrollStyleProps extends AppBarProps {
  ToolbarProps: ToolbarProps;
  children: React.ReactElement<any>;
}

function ScrollStyle({ children, sx, ...other }: ScrollStyleProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return children
    ? React.cloneElement(children, {
      ...other,
      sx: trigger
        ? {
          ...sx,
          backgroundColor: alpha(theme.palette.background.default, 0.95),
          borderBottom: `1px solid ${theme.palette.divider}`,
        }
        : sx,
    })
    : null;
}

function NavBar({ logo, menus, socialLinks }: NavBarProps) {
  return (
    <ScrollStyle
      ToolbarProps={{ sx: { minHeight: { xs: 48, md: 56 } } }}
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        border: "none",
        borderBottom: "1px solid transparent",
        p: 0,
      }}
    >
      <NavigationBar>
        <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
          <MobileNavBar
            logo={logo}
            menus={menus}
            socialLinks={socialLinks}
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          />
          <DesktopNavBar
            logo={logo}
            menus={menus}
            socialLinks={socialLinks}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          />
        </Section>
      </NavigationBar>
    </ScrollStyle>
  );
}

export default NavBar;
