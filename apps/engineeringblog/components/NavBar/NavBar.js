"use client";

import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import { alpha, useScrollTrigger, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavBar from "@/engineeringblog/components/DesktopNavBar";
import MobileNavBar from "@/engineeringblog/components/MobileNavBar";
import logoLight from "@/engineeringblog/assets/images/logo-light.png";

function ScrollStyle({ children, sx, ...other }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    ...other,
    sx: trigger
      ? {
          ...sx,
          backgroundColor: alpha(theme.palette.background.default, 0.9),
          borderBottom: `1px solid ${theme.palette.divider}`,
        }
      : sx,
  });
}

function NavBar({ logo: logoProp, menus, socialLinks }) {
  const logo = logoProp || { height: 32, src: logoLight.src, width: 29.5 };

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

NavBar.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

export default NavBar;
