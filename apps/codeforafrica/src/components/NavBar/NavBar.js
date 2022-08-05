import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavBar from "@/codeforafrica/components/DesktopNavBar";
import MobileNavBar from "@/codeforafrica/components/MobileNavBar";

function NavBar({ logo, menu }) {
  return (
    <NavigationBar sx={{ py: { xs: "10px", md: "15.5" } }}>
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <MobileNavBar
          logo={logo}
          menu={menu}
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        />
        <DesktopNavBar
          logo={logo}
          menu={menu}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        />
      </Section>
    </NavigationBar>
  );
}

NavBar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

NavBar.defaultProps = {
  menu: undefined,
};

export default NavBar;
