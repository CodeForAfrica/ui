import React from "react";

import NavBar from "@/robots-generator/components/NavBar";
import Footer from "../Footer";

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
  footer?: Footer;
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
