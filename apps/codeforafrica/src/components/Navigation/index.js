import { NavBar, Section } from "@commons-ui/core";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import React from "react";

import DesktopNavigation from "@/codeforafrica/components/Navigation/DesktopNavigation";
import MobileNavigation from "@/codeforafrica/components/Navigation/MobileNavigation";

function NavBar({ menu }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <NavBar>
      <Section>
        {isMobile ? (
          <MobileNavigation menu={menu} />
        ) : (
          <DesktopNavigation menu={menu} />
        )}
      </Section>
    </NavBar>
  );
}

Navigation.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

Navigation.defaultProps = {
  menu: undefined,
};

export default Navigation;
