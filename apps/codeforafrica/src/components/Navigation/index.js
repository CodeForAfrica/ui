import { NavBar, Section } from "@commons-ui/core";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

import DesktopNavigation from "@/codeforafrica/components/Navigation/DesktopNavigation";
import MobileNavigation from "@/codeforafrica/components/Navigation/MobileNavigation";

function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <NavBar>
      <Section>
        {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
      </Section>
    </NavBar>
  );
}

export default Navigation;
