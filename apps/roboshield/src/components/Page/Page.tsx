import React from "react";

import Footer from "@/roboshield/components/Footer";
import type { FooterProps } from "@/roboshield/components/Footer";
import NavBar from "@/roboshield/components/NavBar";
import type { SocialMediaLink } from "@/roboshield/components/SocialMediaLinkIcon";

interface Menu {
  label: string;
  href: string;
}

interface Menu {
  label: string;
  href: string;
}

interface Navbar {
  logo: any;
  menus: Menu[];
  socialLinks: SocialMediaLink[];
}
interface Footer {
  logo: any;
  description: string;
  partners: any[];
}

interface Props {
  children?: React.ReactNode;
  navbar?: Navbar;
  footer?: FooterProps;
}
function Page({ children, navbar, footer }: Props) {
  return (
    <>
      {navbar ? <NavBar {...navbar} /> : null}
      {children ? <main>{children}</main> : null}
      {footer ? <Footer {...footer} /> : null}
    </>
  );
}

export default Page;
