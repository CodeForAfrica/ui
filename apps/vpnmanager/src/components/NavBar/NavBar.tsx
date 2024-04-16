import React from "react";

import DesktopNavBar from "@/vpnmanager/components/DesktopNavBar";
import MobileNavBar from "@/vpnmanager/components/MobileNavBar";
import { NavBar as NavigationBar, Section } from "@commons-ui/core";

interface SocialLinks {
  platform: string;
  url: string;
}

interface Menu {
  label: string;
  href: string;
}
interface Props {
  logo: any;
  menus: Menu[];
  socialLinks: SocialLinks[];
}
function NavBar({ logo, menus, socialLinks }: Props) {
  return (
    <NavigationBar sx={{ py: { xs: "10px", md: "15.5" } }}>
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
