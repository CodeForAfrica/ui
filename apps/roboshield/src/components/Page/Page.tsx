import React from "react";

import type { FooterProps } from "@/roboshield/components/Footer";
import Footer from "@/roboshield/components/Footer";

import NavBar from "@/roboshield/components/NavBar";

interface SocialLinks {
  platform: string;
  url: string;
}

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
  socialLinks: SocialLinks[];
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
