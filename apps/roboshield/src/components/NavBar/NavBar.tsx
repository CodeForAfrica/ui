import { NavBar as NavigationBar, Section } from "@commons-ui/core";
import React from "react";

import DesktopNavBar from "@/roboshield/components/DesktopNavBar";
import MobileNavBar from "@/roboshield/components/MobileNavBar";
import type { SocialMediaLink } from "@/roboshield/components/SocialMediaLinkIcon";

interface Menu {
  label: string;
  href: string;
}
interface Props {
  logo: any;
  menus: Menu[];
  socialLinks: SocialMediaLink[];
}
function NavBar({ logo, menus, socialLinks }: Props) {
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

export default NavBar;
