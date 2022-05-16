import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavigation from "@/codeforafrica/components/NavBar/DesktopNavigation";
import MobileNavigation from "@/codeforafrica/components/NavBar/MobileNavigation";

function NavBar({ menu }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <NavigationBar>
      <Section>
        {isMobile ? (
          <MobileNavigation menu={menu} direction="column" />
        ) : (
          <DesktopNavigation menu={menu} direction="row" />
        )}
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
