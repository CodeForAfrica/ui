import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import React from "react";

import DesktopNavBar from "@/roboshield/components/DesktopNavBar";
import MobileNavBar from "@/roboshield/components/MobileNavBar";
import type {
  Menu,
  SocialMediaLink,
} from "@/roboshield/components/NavBarNavList";

interface NavBarProps {
  logo: any;
  menus: Menu[];
  socialLinks: SocialMediaLink[];
}

function NavBar({ logo, menus, socialLinks }: NavBarProps) {
  return (
    <NavigationBar sx={{ py: { xs: "10px", md: "20px" } }}>
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

export type { NavBarProps };
export default NavBar;
