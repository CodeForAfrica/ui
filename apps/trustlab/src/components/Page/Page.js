import { NextSeo } from "next-seo";
import React from "react";

function Page({ children, seo }) {
  return (
    <>
      <NextSeo {...seo} />
      {/* TODO: Add Navbar and footer */}
      {children ? <main>{children}</main> : null}
    </>
  );
}

export default Page;
