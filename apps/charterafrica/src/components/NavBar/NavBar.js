import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import DesktopNavBar from "@/charterafrica/components/DesktopNavBar";
import MobileNavBar from "@/charterafrica/components/MobileNavBar";

function NavBar({ logo }) {
  return (
    <NavigationBar
      sx={{
        backgroundColor: neutral[900],
        display: "flex",
        justifyContent: "center",
        py: { sm: 2.5, md: 3.5 },
        px: { xs: 2, sm: 0 },
      }}
    >
      <Section>
        <MobileNavBar
          logo={logo}
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        />
        <DesktopNavBar
          logo={logo}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        />
      </Section>
    </NavigationBar>
  );
}

export default NavBar;
