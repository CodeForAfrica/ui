import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavBar from "@/civicsignalblog/components/DesktopNavBar";
import MobileNavBar from "@/civicsignalblog/components/MobileNavBar";

function NavBar({ logo, menus, socialLinks }) {
  return (
    <NavigationBar
      sx={{ bgcolor: "primary.main", py: { xs: "10px", md: "15.5" } }}
    >
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

NavBar.defaultProps = {
  menus: undefined,
};

export default NavBar;
