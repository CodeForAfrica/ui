import { NextSeo } from "next-seo";
import React from "react";

import Footer from "@/trustlab/components/Footer";
import NavBar from "@/trustlab/components/NavBar";

function Page({ children, footer, navbar, seo }) {
  return (
    <>
      <NextSeo {...seo} />
      {navbar ? <NavBar {...navbar} /> : null}
      {children ? <main>{children}</main> : null}
      {footer ? <Footer {...footer} /> : null}
    </>
  );
}

export default Page;
