import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavBar from "@/codeforafrica/components/NavBar/DesktopNavBar";
import MobileNavBar from "@/codeforafrica/components/NavBar/MobileNavBar";

function NavBar({ menu }) {
  return (
    <NavigationBar>
      <Section>
        <MobileNavBar menu={menu} direction="column" />
        <DesktopNavBar menu={menu} direction="row" />
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
