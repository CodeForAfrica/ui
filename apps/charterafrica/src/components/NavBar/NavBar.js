import { NavBar as CuiNavBar, Section } from "@commons-ui/core";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import DesktopNavBar from "@/charterafrica/components/DesktopNavBar";
import MobileNavBar from "@/charterafrica/components/MobileNavBar";

const NavBar = React.forwardRef(function NavBar(props, ref) {
  const { languages, logo, menus } = props;

  return (
    <CuiNavBar
      sx={{
        backgroundColor: neutral[900],
        py: { md: 3.5 },
      }}
      ref={ref}
    >
      <Section
        sx={[
          {
            px: { xs: 2.5, sm: 0 },
          },
          (theme) => ({
            [theme.breakpoints.only("md")]: {
              maxWidth: `calc(${theme.breakpoints.values.md}${
                theme.breakpoints.unit ?? "px"
              } - 20px)`,
            },
          }),
        ]}
      >
        <MobileNavBar
          logo={logo}
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        />
        <DesktopNavBar
          languages={languages}
          logo={logo}
          menus={menus}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        />
      </Section>
    </CuiNavBar>
  );
});

export default NavBar;
