import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import { alpha, useScrollTrigger, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavBar from "@/civicsignalblog/components/DesktopNavBar";
import MobileNavBar from "@/civicsignalblog/components/MobileNavBar";

function ScrollStyle({ children, elevation, sx }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : elevation,
    sx: trigger
      ? {
          ...sx,
          backgroundColor: alpha(theme.palette.primary.dark, 0.9),
        }
      : sx,
  });
}

function NavBar({ logo, menus, socialLinks }) {
  return (
    <ScrollStyle
      elevation={0}
      sx={{
        bgcolor: "primary.dark",
        py: { xs: "10px", md: "15.5" },
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
              color: "text.secondary",
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
