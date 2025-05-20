import { NextSeo } from "next-seo";
import React from "react";
import NavBar from "@/trustlab/components/NavBar";
import Footer from "@/trustlab/components/Footer";

function Page({ children, seo, navbar, footer }) {
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
