import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavBar from "@/trustlab/components/DesktopNavBar";
import MobileNavBar from "@/trustlab/components/MobileNavBar";

function NavBar({ logo, menus, socialLinks }) {
  return (
    <NavigationBar sx={{ py: { xs: "10px", md: "15.5" } }}>
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
