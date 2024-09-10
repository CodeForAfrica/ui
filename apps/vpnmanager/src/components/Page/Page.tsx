import React from "react";

import type { NavBarProps } from "@/vpnmanager/components/NavBar";
import NavBar from "@/vpnmanager/components/NavBar";

interface PageProps {
  children?: React.ReactNode;
  navbar?: NavBarProps;
}

function Page({ children, navbar }: PageProps) {
  return (
    <>
      {navbar ? <NavBar {...navbar} /> : null}
      {children ? <main>{children}</main> : null}
    </>
  );
}

export default Page;
