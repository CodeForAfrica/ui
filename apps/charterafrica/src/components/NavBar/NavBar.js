import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import DesktopNavBar from "@/charterafrica/components/DesktopNavBar";
import MobileNavBar from "@/charterafrica/components/MobileNavBar";

function NavBar({ logo, menus }) {
  return (
    <NavigationBar
      sx={{
        backgroundColor: neutral[900],
        py: { md: 3.5 },
      }}
    >
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <MobileNavBar
          logo={logo}
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        />
        <DesktopNavBar
          logo={logo}
          menus={menus}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        />
      </Section>
    </NavigationBar>
  );
}

export default NavBar;
