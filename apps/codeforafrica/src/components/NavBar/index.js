import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavigation from "@/codeforafrica/components/NavBar/DesktopNavigation";
import MobileNavigation from "@/codeforafrica/components/NavBar/MobileNavigation";

function NavBar({ menu }) {
  return (
    <NavigationBar>
      <Section>
        <MobileNavigation menu={menu} direction="column" />
        <DesktopNavigation menu={menu} direction="row" />
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
