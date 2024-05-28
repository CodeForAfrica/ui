import React from "react";

import NavBar from "@/robots-generator/components/NavBar";

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

interface Props {
  children?: React.ReactNode;
  navbar?: Navbar;
}
function Page({ children, navbar }: Props) {
  return (
    <>
      {navbar ? <NavBar {...navbar} /> : null}
      {children ? <main>{children}</main> : null}
    </>
  );
}

export default Page;
